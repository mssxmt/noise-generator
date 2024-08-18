import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// import { GUI } from 'dat.gui';
import { vertexShader, fragmentShader } from './Shaders';

interface AudioVisualizerProps {
  audioData: Float32Array | null;
  sampleRate: number;
  volume: number;
  displayChecked?: boolean;
  effectType: number;
  colorMode: number;
  wireframeMode: number;
}

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

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [uniforms] = useState({
    u_time: { value: 0 },
    u_amplitude: { value: 3.0 },
    u_data_arr: { value: new Float32Array(128) },
    u_effect_type: { value: effectType },
    u_color_mode: { value: colorMode },
  });

  useEffect(() => {
    // オーディオコンテキストのセットアップ
    const setupAudioContext = () => {
      if (!audioData) {
        return;
      }
      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;

      const buffer = audioCtx.createBuffer(1, audioData.length, sampleRate);
      buffer.getChannelData(0).set(audioData);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

      source.connect(gainNode);
      gainNode.connect(analyserNode);
      // `context.destination` に接続しないことで音を鳴らさない
      // analyserNode.connect(audioCtx.destination);

      source.start();
      sourceRef.current = source;
      setAudioContext(audioCtx);
      setAnalyser(analyserNode);
      dataArrayRef.current = new Uint8Array(analyserNode.frequencyBinCount);
    };

    setupAudioContext();

    return () => {
      if (dataArrayRef.current) {
        dataArrayRef.current = null;
      }
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioData, sampleRate, volume]);

  useFrame((state) => {
    if (analyser && dataArrayRef.current) {
      analyser.getByteFrequencyData(dataArrayRef.current);
      uniforms.u_time.value = state.clock.elapsedTime;
      uniforms.u_data_arr.value = new Float32Array(dataArrayRef.current);
      // uniforms を更新して再描画
      uniforms.u_effect_type.value = effectType;
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
// メインコンポーネント
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
