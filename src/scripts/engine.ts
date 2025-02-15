import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { GestureClassifier } from "./gesture_classifier";
import { calc_keypoints, normalize_keypoints } from "../utils/algo";
import { draw_connections, draw_landmarks } from "../utils/draw";

let results: HandLandmarkerResult;

async function inference(engine: Engine) {
  if (!engine.state) {
    return;
  }

  if (engine.lastVideoTime !== engine.video.currentTime) {
    engine.lastVideoTime = engine.video.currentTime;
    results = engine.landmarker.detectForVideo(
      engine.video,
      performance.now()
    ) as HandLandmarkerResult;
  }

  engine.canvasCtx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
  if (results.landmarks.length > 0) {
    let i = 0;
    for (const landmark of results.landmarks) {
      let keypoints = calc_keypoints(
        landmark as NormalizedLandmark[],
        engine.canvas
      ) as number[][];

      draw_connections(
        keypoints,
        engine.canvasCtx,
        engine.lineColor,
        engine.lineThickness
      );
      draw_landmarks(
        keypoints,
        engine.canvasCtx,
        engine.landmarkColor,
        engine.landmarkRadius
      );

      let normalized_keypoints = normalize_keypoints(keypoints);

      let labelID = -1;
      if (results.handedness[i][0].displayName == "Right") {
        labelID =
          engine.gesture_classifier_right.inference(normalized_keypoints);
      } else {
        labelID =
          engine.gesture_classifier_left.inference(normalized_keypoints);
      }

      console.log(engine.labels[labelID]);

      i += 1;
    }
  }

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public labels: string[] = [];
  public landmarker!: HandLandmarker;
  public gesture_classifier_left!: GestureClassifier;
  public gesture_classifier_right!: GestureClassifier;

  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public canvasCtx!: CanvasRenderingContext2D;

  public lastVideoTime = -1;
  public state = false;

  public landmarkColor = "#f9756d";
  public lineColor = "#32b78e";
  public landmarkRadius = 2;
  public lineThickness = 2;

  private stream!: MediaStream;
  private inferenceHandler!: () => void;

  constructor() {
    this.readLabels();
    this.loadModel();
    this.findAndConnectCamera();
  }

  private readLabels() {
    fetch("labels.json")
      .then((response) => response.json())
      .then((data) => {
        this.labels.push(...data);
      });
  }

  private async loadModel() {
    const filesetResolver = await FilesetResolver.forVisionTasks("wasm");
    this.landmarker = await HandLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: "hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });
    this.gesture_classifier_left = new GestureClassifier(
      "gesture_classifier_left.tflite"
    );
    this.gesture_classifier_right = new GestureClassifier(
      "gesture_classifier_right.tflite"
    );
  }

  private findAndConnectCamera() {
    const video = document.getElementById("webcam") as HTMLVideoElement;
    if (video == null) {
      return;
    }
    this.video = video as HTMLVideoElement;

    const canvas = document.getElementById(
      "webcam-overlay"
    ) as HTMLCanvasElement;
    if (canvas == null) {
      return;
    }
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.inferenceHandler = () => inference(this);
      this.video.addEventListener("loadeddata", this.inferenceHandler);
    });
  }

  private disconnectCamera() {
    this.video.removeEventListener("loadeddata", this.inferenceHandler);
    if (this.video.srcObject) {
      this.video.pause();
      this.video.srcObject = null;
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public setState(state: boolean) {
    this.state = state;
    if (state) {
      this.findAndConnectCamera();
    } else {
      this.disconnectCamera();
    }
  }
}
