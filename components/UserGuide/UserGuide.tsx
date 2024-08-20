import { css } from '@kuma-ui/core';
import { NextImage } from '../NextImage/NextImage';
import { useCallback, useEffect, useRef } from 'react';
import { IconSquareRoundedX } from '@tabler/icons-react';

const Section = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  overscroll-behavior-y: contain;
`;

const Inner = css`
  background-color: t('colors.grey.light1');
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  height: 100%;
  overflow-y: auto;
`;

const Box = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;
  /* border: 1px solid t('colors.primary.default'); */
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: var(--var-shadow);
`;

const H3 = css`
  font-size: 1.5rem;
  color: t('colors.alert.success');
  position: absolute;
  top: -1rem;
  left: 0;
  background-color: t('colors.grey.light1');
  padding: 0 1rem;
  margin-left: 1rem;
  box-shadow: var(--var-shadow);
  border-radius: 1rem;
`;

const P = css`
  padding: 1rem 1rem 0;
  white-space: pre-wrap;
  line-height: 1.5rem;
`;

const Button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: t('colors.grey.dark');
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: t('colors.shadowHover');
    color: t('colors.primary.default');
  }

  &.active {
    box-shadow: t('colors.shadow');
    color: t('colors.primary.light');
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
`;

export const UserGuide = ({ onClose }: { onClose: () => void }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleKeyDownEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEscKey);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEscKey);
    };
  }, [handleKeyDownEscKey]);

  return (
    <section className={Section} onClick={() => onClose()} ref={elementRef}>
      <div className={Inner}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.8rem' }}>User Guide</h2>
          <button
            className={Button}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <IconSquareRoundedX className={iconStyle} />
          </button>
        </div>
        <hr />
        {UserGuideData.map((data) => (
          <div className={Box} key={data.title}>
            <h3 className={H3}>{data.title}</h3>
            <p className={P}>{data.content}</p>
            <NextImage src={data.src} alt={data.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

const UserGuideData: { title: string; content: string; src: string }[] = [
  {
    title: 'Dark Mode',
    content: 'ダークモード・ライトモードを切り替えることができます。',
    src: '0.png',
  },
  {
    title: 'Sound Preview',
    content: `Sound Previewセクションでは、セレクトボックスからサウンドの種類を変更することができます。\nDurationスライダーでサウンドの長さを変更することができます。\nVolumeスライダーでサウンドの音量を変更することができます。\nPlayボタン、サウンドが再生されます。\nどんぶりボタンでサウンドがSAVED SOUND(S)に保存されます\n※注意:保存されたサウンドはブラウザーのストレージ領域に格納されます`,
    src: '1.png',
  },
  {
    title: 'minimum panel',
    content: `各ブロックの+ボタンでパネルやスライダーを最小化することができます。\n元に戻すときは-ボタンをクリックします。`,
    src: '2.png',
  },
  {
    title: 'Visual Control 2D',
    content:
      'Visual Controlでは右側のトグルボタンで□アイコンを選択時には平面波形を表示します。\nColorボタンで色を変更することができます。\nLineWidthスライダーで線の太さを変更することができます。\nSliceWidthスライダーで波形の細かさを変更することができます。',
    src: '12.png',
  },
  {
    title: 'Visual Control 3D',
    content:
      'Visual Controlでは右側のトグルボタンで立方体アイコンを選択時には3D波形を表示します。\nEffect Typeボタンでオブジェクトの形状を変更することができます。\nColor Modeボタンで色を変更することができます。\nWireframeボタンでオブジェクトのワイヤーフレームを表示することができます。',
    src: '11.png',
  },
  {
    title: 'List Mode of SAVED SOUND(S)',
    content: `右側のトグルボタンをリストアイコンにすることで表示されるリストモードエリアです。
Sound Previewエリアのどんぶりボタンで保存されたサウンドがここにリストされます。
サウンドは最大16個まで保存することができます。
リストにはサウンドの種類、長さが表示されます。
Playボタンでサウンドが再生されます。
Deleteボタンでサウンドが削除され、ブラウザーのストレージ領域からも削除されます。
リスト右側のキーボードアイコン横のアルファベットはアサインされたキーボードを著します。
サウンドが保存される順番にキーボードのa,w,s,e,d,f,t,g,y,h,u,j,k,o,l,pにアサインされキーボードでの演奏が可能になります。
（鍵盤配列を想像してみて）`,
    src: '5.png',
  },
  {
    title: 'Pads Mode of SAVED SOUND(S)',
    content: `右側のトグルボタンをパッドアイコンにすることで表示されるパッドモードエリアです。
基本的にリスト表示と同じですが、タッチパネルでの演奏を想定したインターフェイスです。
Deleteボタンは無いので、サウンドの削除はリストモードで行うか、Delete Allボタンで行うことができます。
各パッドへのアサインは左下から右上の順に割り当てられます。
また、リストモード同様にキーボードにもアサインされます。`,
    src: '4.png',
  },
  {
    title: 'DELETE ALL',
    content: `サウンドを纏めて削除することができます。
(ゴミ箱アイコンが保存されたサウンドの数分出てくる!)`,
    src: '6.png',
  },
  {
    title: 'Download All WAV Files',
    content: `保存したサウンドをダウンロードすることができます。
サウンドのファイル形式はWAVファイル形式です。
(Zipファイルでダウンロードされますので、解凍して)`,
    src: '7.png',
  },
  {
    title: 'Monitor Visualizer Mode',
    content: `ビジュアライザーモードの切り替えボタンです。
人工衛星アイコン時は画面下のエリアにビジュアライザーを表示します。`,
    src: '9.png',
  },
  {
    title: 'Monitor Visualizer Mode Area',
    content: `(人工衛星アイコン時は画面下のエリアにビジュアライザーを表示するの例)
3Dモード時はオブジェクトの拡大・縮小、回転を行うことができます。
この時の状態は後述のフルスクリーンモードにも適用されます。
また、Visual Controlでの操作は即時反映されます`,
    src: '13.png',
  },
  {
    title: 'Full Screen Visualizer Mode',
    content: `ビジュアライザーモードの切り替えボタンです。
惑星アイコン時は画面全体にビジュアライザーを表示します。`,
    src: '8.png',
  },
  {
    title: 'Full Screen Visualizer Mode',
    content: `(人工衛星アイコン時は画面全体にビジュアライザーを表示するの例)
フルスクリーンモード時はオブジェクトの拡大・縮小、回転を行うことができません。
Visual Controlでの操作は即時反映されます。`,
    src: '15.png',
  },
];
