import { HandLandmarker } from "@mediapipe/tasks-vision";

export function draw_landmarks(
  keypoints: number[][],
  canvasCtx: CanvasRenderingContext2D,
  color: string,
  radius = 2
) {
  for (const keypoint of keypoints) {
    canvasCtx.fillStyle = color;
    canvasCtx.beginPath();
    canvasCtx.arc(keypoint[0], keypoint[1], radius, 0, 2 * Math.PI);
    canvasCtx.fill();
  }
}

export function draw_connections(
  keypoints: number[][],
  canvasCtx: CanvasRenderingContext2D,
  color: string,
  thickness = 2
) {
  for (const connection of HandLandmarker.HAND_CONNECTIONS) {
    const start = keypoints[connection.start];
    const end = keypoints[connection.end];
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = thickness;
    canvasCtx.beginPath();
    canvasCtx.moveTo(start[0], start[1]);
    canvasCtx.lineTo(end[0], end[1]);
    canvasCtx.stroke();
  }
}
