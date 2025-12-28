import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// import { GUI } from 'dat.gui';
import { vertexShader, fragmentShader } from './Shaders';

/**
 * @interface AudioVisualizerProps
 * @description AudioVisualizerコンポーネントのプロパティを定義します。
 * @property {Float32Array | null} audioData - 表示するオーディオデータ。
 * @property {number} sampleRate - オーディオのサンプルレート。
 * @property {number} volume - オーディオの音量。
 * @property {boolean} [displayChecked] - 表示がチェックされているかどうか。
 * @property {number} effectType - ビジュアライザーのエフェクトタイプ。
 * @property {number} colorMode - ビジュアライザーのカラーモード。
 * @property {number} wireframeMode - ワイヤーフレームモードが有効かどうか。
 */
interface AudioVisualizerProps {
  audioData: Float32Array | null;
  sampleRate: number;
  volume: number;
  displayChecked?: boolean;
  effectType: number;
  colorMode: number;
  wireframeMode: number;
}

/**
 * オーディオデータを視覚化するThree.jsメッシュをレンダリングするコンポーネント。
 * @param {AudioVisualizerProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} - オーディオビジュアライザーのメッシュ。
 */
const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioData,
  sampleRate,
  volume,
  effectType,
  colorMode,
  wireframeMode,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Reuse AudioContext and AnalyserNode across renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Memoize uniforms to avoid recreation
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_amplitude: { value: 3.0 },
      u_data_arr: { value: new Float32Array(128) },
      u_effect_type: { value: effectType },
      u_color_mode: { value: colorMode },
    }),
    [effectType, colorMode]
  );

  useEffect(() => {
    if (!audioData) {
      return;
    }

    // Create AudioContext and AnalyserNode only once
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext ||
        (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    const audioCtx = audioContextRef.current;
    const analyserNode = analyserRef.current;

    if (!analyserNode) return;

    // Create buffer from audio data
    const buffer = audioCtx.createBuffer(1, audioData.length, sampleRate);
    buffer.getChannelData(0).set(audioData);

    // Create and configure source
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    source.connect(gainNode);
    gainNode.connect(analyserNode);
    // Don't connect to destination to avoid playing sound

    source.start();
    sourceRef.current = source;
    dataArrayRef.current = new Uint8Array(analyserNode.frequencyBinCount);

    return () => {
      // Only stop and disconnect, don't close the context
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
          sourceRef.current.disconnect();
        } catch (e) {
          // Source may already be stopped
        }
        sourceRef.current = null;
      }
    };
  }, [audioData, sampleRate, volume]);

  useFrame((state) => {
    const analyser = analyserRef.current;
    if (!analyser || !dataArrayRef.current) return;

    analyser.getByteFrequencyData(dataArrayRef.current);

    // Update time uniform
    uniforms.u_time.value = state.clock.elapsedTime;

    // Reuse Float32Array instead of creating new one
    const dataArr = dataArrayRef.current;
    for (let i = 0; i < dataArr.length; i++) {
      uniforms.u_data_arr.value[i] = dataArr[i];
    }

    // Update effect and color uniforms only when changed
    if (uniforms.u_effect_type.value !== effectType) {
      uniforms.u_effect_type.value = effectType;
    }
    if (uniforms.u_color_mode.value !== colorMode) {
      uniforms.u_color_mode.value = colorMode;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2 + Math.PI / 4, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[64, 64, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={wireframeMode === 0}
      />
    </mesh>
  );
};

/**
 * Three.jsのシーンを設定し、AudioVisualizerをレンダリングするコンポーネント。
 * @param {{ audioData: Float32Array | null; sampleRate: number; volume: number; effectType: number; colorMode: number; wireframeMode: number; }} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} - Three.jsシーン。
 */
const Scene: React.FC<{
  audioData: Float32Array | null;
  sampleRate: number;
  volume: number;
  effectType: number;
  colorMode: number;
  wireframeMode: number;
}> = ({
  audioData,
  sampleRate,
  volume,
  effectType,
  colorMode,
  wireframeMode,
}) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={true} />
      {audioData && (
        <AudioVisualizer
          audioData={audioData}
          sampleRate={sampleRate}
          volume={volume}
          effectType={effectType}
          colorMode={colorMode}
          wireframeMode={wireframeMode}
        />
      )}
    </>
  );
};

/**
 * Three.jsを使用してオーディオ波形を表示するメインコンポーネント。
 * @param {AudioVisualizerProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} - Three.js波形表示コンポーネント。
 */
const WaveformDisplayThree: React.FC<AudioVisualizerProps> = (props) => {
  const {
    audioData,
    sampleRate,
    volume,
    displayChecked,
    effectType,
    colorMode,
    wireframeMode,
  } = props;

  return (
    <div>
      <Canvas
        style={{
          aspectRatio: displayChecked ? 'auto' : '2 / 1',
          position: displayChecked ? 'absolute' : 'relative',
          top: '0',
          left: '0',
          width: '100%',
          height: displayChecked ? '100vh' : '100%',
          zIndex: displayChecked ? '-1' : '1',
          transition: 'all 0.3s ease',
        }}
        camera={{ position: [0, 0, 50], fov: 50 }}
      >
        <Scene
          audioData={audioData}
          sampleRate={sampleRate}
          volume={volume}
          effectType={effectType}
          colorMode={colorMode}
          wireframeMode={wireframeMode}
        />
      </Canvas>
    </div>
  );
};

export default WaveformDisplayThree;
