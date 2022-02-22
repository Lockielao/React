import { useRef, useEffect } from 'react'

function VerifyCode(props) {
  const canvasRef = useRef(null)
  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
  }
  // 画干扰线
  function drawLine(ctx) {
    for (let i = 0; i <= 5; i++) {
      ctx.strokeStyle = randomColor();
      ctx.beginPath();
      ctx.moveTo(Math.random() * props.width, Math.random() * props.height);
      ctx.lineTo(Math.random() * props.width, Math.random() * props.height);
      ctx.stroke();
    }
  }
  // 噪点
  function drawDot(ctx) {
    for (let i = 0; i <= 40; i++) {
      ctx.strokeStyle = randomColor();
      ctx.beginPath();
      const x = Math.random() * props.width;
      const y = Math.random() * props.height;
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y + 1);
      ctx.stroke();
    }
  }
  function drawCode(ctx) {
    const codeStr = 'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
    const codeList = codeStr.split(',')
    const codeLength = codeList.length
    let output = []
    for (let i = 0; i < 4; i++) {
      const j = Math.floor(Math.random() * codeLength)
      const deg = Math.random() - 0.5
      const txt = codeList[j]
      output[i] = txt.toLowerCase()
      const x = 20 + i * 40
      const y = 20 + Math.random() * 8
      ctx.font = "bold 26px 微软雅黑";
      ctx.translate(x, y);
      ctx.rotate(deg);
      ctx.fillStyle = randomColor();
      ctx.fillText(txt, 0, 0);
      ctx.rotate(-deg);
      ctx.translate(-x, -y);
    }
    drawLine(ctx)
    drawDot(ctx)
    props.code(output.join(',').replace(/,/g, ''))
  }
  function reDraw() {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, props.width, props.height)
    drawCode(ctx)
  }
  useEffect(() => {
    drawCode(canvasRef.current.getContext('2d'))
  })
  return (
    <canvas width={props.width} height={props.height} ref={canvasRef} onClick={() => reDraw()}></canvas>
  )
}
export default VerifyCode