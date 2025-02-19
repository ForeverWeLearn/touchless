import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { left_hand_result_store, right_hand_result_store } from "../stores/hand_result";
import { calc_keypoints, normalize_keypoints } from "../utils/algo";
import { draw_connections, draw_landmarks } from "../utils/draw";
import { GestureClassifier } from "./gesture_classifier";
import { GestureParser } from "./gesture_parser";

let results: HandLandmarkerResult;
let next_trigger_time = 0;

async function inference(engine: Engine) {
  if (!engine.state) {
    return;
  }

  const current_time = performance.now();

  if (current_time < next_trigger_time) {
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  results = engine.landmarker.detectForVideo(engine.video, current_time);

  engine.context_2d.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  if (results.landmarks.length == 0) {
    next_trigger_time = current_time + 250;
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  let i = 0;
  for (const landmark of results.landmarks) {
    let keypoints = calc_keypoints(landmark, engine.canvas);

    engine.draw(keypoints);

    let normalized_keypoints = normalize_keypoints(keypoints);

    const handedness = results.handedness[i][0].displayName == "Left" ? 0 : 1;
    const label_id = engine.gesture_classifier[handedness].inference(normalized_keypoints);

    engine.gesture_parser[handedness].parse(label_id, keypoints);

    engine.hand_result[handedness].gesture = engine.gesture_parser[handedness].labels[label_id];
    engine.hand_result[handedness].hold_time = engine.gesture_parser[handedness].hold_time;

    i += 1;
  }

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public state = false;

  public landmarker!: HandLandmarker;
  public gesture_classifier: GestureClassifier[] = [];
  public gesture_parser: GestureParser[] = [new GestureParser(), new GestureParser()];
  public hand_result = [left_hand_result_store(), right_hand_result_store()];

  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public context_2d!: CanvasRenderingContext2D;

  public landmark_color = "#ff0022";
  public line_color = "#001f22";
  public landmark_radius = 5;
  public line_thickness = 3;

  private stream!: MediaStream;
  private inference_handler!: () => void;

  constructor() {
    this.load_model();
  }

  private async load_model() {
    const fileset_resolver = await FilesetResolver.forVisionTasks("wasm");
    this.landmarker = await HandLandmarker.createFromOptions(fileset_resolver, {
      baseOptions: {
        modelAssetPath: "hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });
    this.gesture_classifier[0] = new GestureClassifier("gesture_classifier_left.tflite");
    this.gesture_classifier[1] = new GestureClassifier("gesture_classifier_right.tflite");
  }

  private connect_camera() {
    const video = document.getElementById("webcam") as HTMLVideoElement;
    if (video == null) {
      return;
    }
    this.video = video as HTMLVideoElement;

    const canvas = document.getElementById("webcam-overlay") as HTMLCanvasElement;
    if (canvas == null) {
      return;
    }
    this.canvas = canvas;
    this.context_2d = canvas.getContext("2d") as CanvasRenderingContext2D;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.inference_handler = () => inference(this);
      this.video.addEventListener("loadeddata", this.inference_handler);
    });
  }

  private disconnect_camera() {
    this.video.removeEventListener("loadeddata", this.inference_handler);
    if (this.video.srcObject) {
      this.video.pause();
      this.video.srcObject = null;
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    this.context_2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public set_state(state: boolean) {
    this.state = state;
    if (state) {
      this.connect_camera();
    } else {
      this.disconnect_camera();
    }
  }

  public draw(keypoints: number[][]) {
    draw_connections(keypoints, this.context_2d, this.line_color, this.line_thickness);
    draw_landmarks(keypoints, this.context_2d, this.landmark_color, this.landmark_radius);
  }
}
