// const vertexShader = () => {
//   return `
//         varying float x;
//         varying float y;
//         varying float z;
//         varying vec3 vUv;

//         uniform float u_time;
//         uniform float u_amplitude;
//         uniform float[64] u_data_arr;

//         void main() {
//           vUv = position;

//           x = abs(position.x);
//             y = abs(position.y);

//           float floor_x = round(x);
//             float floor_y = round(y);

//           float x_multiplier = (32.0 - x) / 8.0;
//           float y_multiplier = (32.0 - y) / 8.0;

//           // z = position.z;
//           // z = abs(position.x) + abs(position.y);
//           // z = sin(abs(position.x) + abs(position.y));
//           // z = sin(abs(position.x) + abs(position.y) + u_time * .005);
//           z = sin(u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * u_amplitude;
//           // z = (u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * 2.0;

//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
//         }
//       `;
// };

// const fragmentShader = () => {
//   return `
//       varying float x;
//       varying float y;
//       varying float z;
//       varying vec3 vUv;

//       uniform float u_time;
//       // uniform vec3 u_black;
//       // uniform vec3 u_white;

//       void main() {
//         // old
//         // gl_FragColor = vec4(mix(u_black, u_white, vUv.x), 1.0);

//         // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//         // if (vUv.x < 0.0) {
//         //   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
//         // } else {
//         //   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//         // }
//         // gl_FragColor = vec4(abs(sin(u_time * .001)), 0.0, 0.0, 1.0);
//         gl_FragColor = vec4((32.0 - abs(x)) / 32.0, (32.0 - abs(y)) / 32.0, (abs(x + y) / 2.0) / 32.0, 1.0);
//       }
//     `;
// };
const vertexShader = `
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;

  uniform float u_time;
  uniform float u_amplitude;
  uniform float[128] u_data_arr;
  uniform int u_effect_type;

  void main() {
    vUv = position;
    x = abs(position.x);
    y = abs(position.y);
    float floor_x = round(x);
    float floor_y = round(y);

if (u_effect_type == 0) {
  // Default effect
  z = sin(u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * u_amplitude;
} else if (u_effect_type == 1) {
  // Wave effect
  float audioData = (u_data_arr[int(floor_x)] + u_data_arr[int(floor_y)]) / 10.0;
  z = sin(distance(vec2(x, y), vec2(32.0, 32.0)) - u_time * 2.0 + audioData) * u_amplitude * 10.0;
} else if (u_effect_type == 2) {
  // Pyramid effect
  float audioData = (u_data_arr[int(floor_x)] + u_data_arr[int(floor_y)]) / 100.0;
  z = (64.0 - x - y) * 0.1 * u_amplitude * (1.0 + audioData);
}

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
  }
`;

const fragmentShader = `
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;

  uniform float u_time;
  uniform int u_color_mode;

  void main() {
    vec3 color;
    if (u_color_mode == 0) {
      // Default color mode
      color = vec3((32.0 - abs(x)) / 32.0, (32.0 - abs(y)) / 32.0, (abs(x + y) / 2.0) / 32.0);
    } else if (u_color_mode == 1) {
      // Time-based color mode
      color = vec3(
        (sin(u_time * 0.001 + x / 8.0) + 1.0) / 2.0,
        (sin(u_time * 0.002 + y / 8.0) + 1.0) / 2.0,
        (sin(u_time * 0.003 + (x + y) / 16.0) + 1.0) / 2.0
      );
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;
export { vertexShader, fragmentShader };
