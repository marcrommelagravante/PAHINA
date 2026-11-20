import * as THREE from "three";

export interface BookCoverMaps {
  frontMap: THREE.CanvasTexture;
  frontBump: THREE.CanvasTexture;
  frontRoughness: THREE.CanvasTexture;
  backMap: THREE.CanvasTexture;
  backBump: THREE.CanvasTexture;
  backRoughness: THREE.CanvasTexture;
  spineMap: THREE.CanvasTexture;
  spineBump: THREE.CanvasTexture;
  pagesMap: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Helper to draw circular ring text along an arc on a Canvas2D context.
 */
function drawArcText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  stepAngle: number,
  bottomArc = false
) {
  ctx.save();
  ctx.translate(cx, cy);
  const totalSpread = stepAngle * (text.length - 1);
  const initial = startAngle - totalSpread / 2;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const angle = bottomArc
      ? startAngle + totalSpread / 2 - i * stepAngle
      : initial + i * stepAngle;

    ctx.save();
    ctx.rotate(angle);
    if (bottomArc) {
      ctx.translate(0, radius);
      ctx.rotate(Math.PI);
      ctx.fillText(ch, 0, 0);
    } else {
      ctx.translate(0, -radius);
      ctx.fillText(ch, 0, 0);
    }
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Draws the PAHINA round emblem (double ring + open book rising into a single steam curl)
 * onto a Canvas2D context using the active strokeStyle/fillStyle.
 */
function drawEmblemGeometry(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  includeRingText: boolean
) {
  const s = radius / 56.5;

  ctx.save();
  ctx.translate(cx, cy);

  // Outer & inner rings
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.lineWidth = Math.max(1.5, 2.2 * s);
  ctx.beginPath();
  ctx.arc(0, 0, 56.5 * s, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = Math.max(1.2, 1.55 * s);
  ctx.beginPath();
  ctx.arc(0, 0, 37.5 * s, 0, Math.PI * 2);
  ctx.stroke();

  // Ring inscription
  if (includeRingText) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `500 ${Math.round(7.4 * s)}px Manrope, -apple-system, sans-serif`;
    drawArcText(ctx, "COFFEE & READING ROOM", 0, 0, 46.8 * s, 0, 0.115, false);

    ctx.font = `400 ${Math.round(8.2 * s)}px "Bodoni Moda", Georgia, serif`;
    drawArcText(ctx, "PAHINA", 0, 0, 47.4 * s, Math.PI, 0.175, true);
  }

  // Open book glyph + spine rising into a single steam curl
  ctx.save();
  ctx.scale(s, s);
  ctx.translate(-60, -60);

  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(60, 75);
  ctx.bezierCurveTo(53, 71.2, 45, 70.6, 38.5, 72.2);
  ctx.lineTo(38.5, 54);
  ctx.bezierCurveTo(45, 52.4, 53, 53, 60, 57.2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(60, 75);
  ctx.bezierCurveTo(67, 71.2, 75, 70.6, 81.5, 72.2);
  ctx.lineTo(81.5, 54);
  ctx.bezierCurveTo(75, 52.4, 67, 53, 60, 57.2);
  ctx.stroke();

  // Page edge thickness line
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(42.5, 76);
  ctx.bezierCurveTo(48.2, 74.8, 54.5, 75.2, 60, 78.5);
  ctx.bezierCurveTo(65.5, 75.2, 71.8, 74.8, 77.5, 76);
  ctx.stroke();

  // Spine into single graceful steam curl
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(60, 75);
  ctx.lineTo(60, 57.2);
  ctx.bezierCurveTo(60, 51, 55.6, 49, 56.4, 44.4);
  ctx.bezierCurveTo(57.1, 39.8, 63.6, 38.8, 63.1, 33.8);
  ctx.bezierCurveTo(62.8, 31, 60.6, 29.2, 59.2, 28);
  ctx.stroke();

  ctx.restore();
  ctx.restore();
}

/**
 * Generates subtle woven linen micro-pattern as a fast deterministic fallback
 * until the photographic linen texture image loads and composites over it.
 */
function paintProceduralLinenBase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  linenImage: HTMLImageElement | null
) {
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, w, h);

  if (linenImage && linenImage.complete && linenImage.naturalWidth > 0) {
    // Draw the Japanese linen cloth texture cleanly once (cover-fit) so zero tiling seams appear
    const imgRatio = linenImage.naturalWidth / linenImage.naturalHeight;
    const canvasRatio = w / h;
    let drawW = w;
    let drawH = h;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      offsetX = (w - drawW) / 2;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      offsetY = (h - drawH) / 2;
    }

    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.drawImage(linenImage, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    // Gently unify tint toward PAHINA Deep Ink Grey (#3C4248)
    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "#CFD6DC";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  } else {
    // Crisp fallback woven fibers before image load finishes
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#FFFFFF";
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }
    ctx.fillStyle = "#000000";
    for (let x = 0; x < w; x += 4) {
      ctx.fillRect(x, 0, 1, h);
    }
    ctx.restore();
  }

  // Subtle architectural edge vignette mimicking hand-turned cloth wrap
  const grad = ctx.createRadialGradient(
    w * 0.5,
    h * 0.45,
    w * 0.25,
    w * 0.5,
    h * 0.5,
    w * 0.88
  );
  grad.addColorStop(0, "rgba(255,255,255,0.04)");
  grad.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

/**
 * Generates high-resolution blind-debossed front, back, spine, and page-block textures
 * for the procedural 3D PAHINA hardcover book.
 */
export function createBookCoverMaps(
  linenImage: HTMLImageElement | null
): BookCoverMaps {
  const W = 1024;
  const H = 1408;

  // --- FRONT COVER ALBEDO ---
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = W;
  frontCanvas.height = H;
  const fCtx = frontCanvas.getContext("2d")!;
  paintProceduralLinenBase(fCtx, W, H, "#3F464C", linenImage);

  // Subtle French hinge crease near spine (left edge)
  const hingeGrad = fCtx.createLinearGradient(0, 0, 68, 0);
  hingeGrad.addColorStop(0, "rgba(0,0,0,0.34)");
  hingeGrad.addColorStop(0.55, "rgba(0,0,0,0.22)");
  hingeGrad.addColorStop(0.75, "rgba(255,255,255,0.06)");
  hingeGrad.addColorStop(1, "rgba(0,0,0,0)");
  fCtx.fillStyle = hingeGrad;
  fCtx.fillRect(0, 0, 68, H);

  // Subtle blind-debossed rectangular border frame
  fCtx.strokeStyle = "rgba(18, 22, 26, 0.52)";
  fCtx.lineWidth = 3;
  fCtx.strokeRect(108, 112, W - 188, H - 224);

  // Subtle top-edge highlight inside deboss for realistic blind press depth
  fCtx.save();
  fCtx.translate(1.5, 2);
  fCtx.strokeStyle = "rgba(225, 229, 229, 0.16)";
  fCtx.fillStyle = "rgba(225, 229, 229, 0.16)";
  drawEmblemGeometry(fCtx, W * 0.52, H * 0.41, 182, true);
  fCtx.font = '400 72px "Bodoni Moda", Georgia, serif';
  fCtx.textAlign = "center";
  fCtx.textBaseline = "middle";
  drawTrackedText(fCtx, "PAHINA", W * 0.52, H * 0.655, 24);
  fCtx.restore();

  // Deep blind-debossed impression
  fCtx.strokeStyle = "rgba(15, 19, 22, 0.72)";
  fCtx.fillStyle = "rgba(15, 19, 22, 0.72)";
  drawEmblemGeometry(fCtx, W * 0.52, H * 0.41, 182, true);

  // Wordmark + faint cool silver blind-foil glint so it reads clearly under raking light
  fCtx.font = '400 72px "Bodoni Moda", Georgia, serif';
  fCtx.textAlign = "center";
  fCtx.textBaseline = "middle";
  fCtx.fillStyle = "rgba(14, 17, 20, 0.78)";
  drawTrackedText(fCtx, "PAHINA", W * 0.52, H * 0.655, 24);

  // Subtle warm-paper blind-foil glint along upper lip of emblem + wordmark so it reads clearly in daylight
  fCtx.save();
  fCtx.translate(-1, -1.5);
  fCtx.strokeStyle = "rgba(244, 241, 234, 0.48)";
  fCtx.fillStyle = "rgba(244, 241, 234, 0.54)";
  drawEmblemGeometry(fCtx, W * 0.52, H * 0.41, 182, false);
  drawTrackedText(fCtx, "PAHINA", W * 0.52, H * 0.655, 24);
  fCtx.restore();

  // --- FRONT COVER BUMP MAP ---
  const frontBumpCanvas = document.createElement("canvas");
  frontBumpCanvas.width = W;
  frontBumpCanvas.height = H;
  const fbCtx = frontBumpCanvas.getContext("2d")!;
  fbCtx.fillStyle = "#8C8C8C";
  fbCtx.fillRect(0, 0, W, H);
  if (linenImage && linenImage.complete && linenImage.naturalWidth > 0) {
    fbCtx.save();
    fbCtx.globalAlpha = 0.36;
    fbCtx.drawImage(linenImage, 0, 0, W, H);
    fbCtx.restore();
  }
  // Pressed hinge groove
  fbCtx.fillStyle = "#3A3A3A";
  fbCtx.fillRect(36, 0, 14, H);
  // Pressed border & emblem & wordmark (dark = recessed inward)
  fbCtx.strokeStyle = "#222222";
  fbCtx.fillStyle = "#1D1D1D";
  fbCtx.lineWidth = 5;
  fbCtx.strokeRect(108, 112, W - 188, H - 224);
  drawEmblemGeometry(fbCtx, W * 0.52, H * 0.41, 182, true);
  fbCtx.font = '400 72px "Bodoni Moda", Georgia, serif';
  fbCtx.textAlign = "center";
  fbCtx.textBaseline = "middle";
  drawTrackedText(fbCtx, "PAHINA", W * 0.52, H * 0.655, 24);

  // --- FRONT COVER ROUGHNESS MAP (matte cloth 0.86, burnished deboss 0.46) ---
  const frontRoughCanvas = document.createElement("canvas");
  frontRoughCanvas.width = W;
  frontRoughCanvas.height = H;
  const frCtx = frontRoughCanvas.getContext("2d")!;
  frCtx.fillStyle = "#DCDCDC";
  frCtx.fillRect(0, 0, W, H);
  frCtx.strokeStyle = "#727272";
  frCtx.fillStyle = "#727272";
  frCtx.lineWidth = 6;
  frCtx.strokeRect(108, 112, W - 188, H - 224);
  drawEmblemGeometry(frCtx, W * 0.52, H * 0.41, 182, true);
  frCtx.font = '400 72px "Bodoni Moda", Georgia, serif';
  frCtx.textAlign = "center";
  frCtx.textBaseline = "middle";
  drawTrackedText(frCtx, "PAHINA", W * 0.52, H * 0.655, 24);

  // --- BACK COVER ALBEDO ("Every page holds a story.") ---
  const backCanvas = document.createElement("canvas");
  backCanvas.width = W;
  backCanvas.height = H;
  const bCtx = backCanvas.getContext("2d")!;
  paintProceduralLinenBase(bCtx, W, H, "#3F464C", linenImage);

  // Hinge crease on right edge (when viewed from back)
  const backHinge = bCtx.createLinearGradient(W, 0, W - 68, 0);
  backHinge.addColorStop(0, "rgba(0,0,0,0.34)");
  backHinge.addColorStop(0.55, "rgba(0,0,0,0.22)");
  backHinge.addColorStop(0.75, "rgba(255,255,255,0.06)");
  backHinge.addColorStop(1, "rgba(0,0,0,0)");
  bCtx.fillStyle = backHinge;
  bCtx.fillRect(W - 68, 0, 68, H);

  bCtx.strokeStyle = "rgba(18, 22, 26, 0.48)";
  bCtx.lineWidth = 3;
  bCtx.strokeRect(80, 112, W - 188, H - 224);

  // Centered blind-debossed colophon phrase: "Every page holds a story."
  bCtx.textAlign = "center";
  bCtx.textBaseline = "middle";
  bCtx.font = 'italic 400 54px "Bodoni Moda", Georgia, serif';

  // Pressed dark shadow
  bCtx.fillStyle = "rgba(12, 15, 18, 0.8)";
  bCtx.fillText("Every page", W * 0.48, H * 0.445);
  bCtx.fillText("holds a story.", W * 0.48, H * 0.505);

  // Warm-paper foil highlight catching daylight across the back cover colophon
  bCtx.fillStyle = "rgba(244, 241, 234, 0.78)";
  bCtx.fillText("Every page", W * 0.48 - 1, H * 0.445 - 1.5);
  bCtx.fillText("holds a story.", W * 0.48 - 1, H * 0.505 - 1.5);

  // Minimal hairline & small colophon emblem below
  bCtx.strokeStyle = "rgba(244, 241, 234, 0.42)";
  bCtx.lineWidth = 1.6;
  bCtx.beginPath();
  bCtx.moveTo(W * 0.41, H * 0.575);
  bCtx.lineTo(W * 0.55, H * 0.575);
  bCtx.stroke();

  bCtx.strokeStyle = "rgba(244, 241, 234, 0.54)";
  drawEmblemGeometry(bCtx, W * 0.48, H * 0.665, 58, false);

  // --- BACK COVER BUMP MAP ---
  const backBumpCanvas = document.createElement("canvas");
  backBumpCanvas.width = W;
  backBumpCanvas.height = H;
  const bbCtx = backBumpCanvas.getContext("2d")!;
  bbCtx.fillStyle = "#8C8C8C";
  bbCtx.fillRect(0, 0, W, H);
  if (linenImage && linenImage.complete && linenImage.naturalWidth > 0) {
    bbCtx.save();
    bbCtx.globalAlpha = 0.36;
    bbCtx.drawImage(linenImage, 0, 0, W, H);
    bbCtx.restore();
  }
  bbCtx.fillStyle = "#3A3A3A";
  bbCtx.fillRect(W - 50, 0, 14, H);
  bbCtx.strokeStyle = "#242424";
  bbCtx.fillStyle = "#1E1E1E";
  bbCtx.lineWidth = 4;
  bbCtx.strokeRect(80, 112, W - 188, H - 224);
  bbCtx.textAlign = "center";
  bbCtx.textBaseline = "middle";
  bbCtx.font = 'italic 400 54px "Bodoni Moda", Georgia, serif';
  bbCtx.fillText("Every page", W * 0.48, H * 0.445);
  bbCtx.fillText("holds a story.", W * 0.48, H * 0.505);
  drawEmblemGeometry(bbCtx, W * 0.48, H * 0.665, 58, false);

  // --- BACK COVER ROUGHNESS MAP ---
  const backRoughCanvas = document.createElement("canvas");
  backRoughCanvas.width = W;
  backRoughCanvas.height = H;
  const brCtx = backRoughCanvas.getContext("2d")!;
  brCtx.fillStyle = "#DCDCDC";
  brCtx.fillRect(0, 0, W, H);
  brCtx.fillStyle = "#707070";
  brCtx.strokeStyle = "#707070";
  brCtx.textAlign = "center";
  brCtx.textBaseline = "middle";
  brCtx.font = 'italic 400 54px "Bodoni Moda", Georgia, serif';
  brCtx.fillText("Every page", W * 0.48, H * 0.445);
  brCtx.fillText("holds a story.", W * 0.48, H * 0.505);
  drawEmblemGeometry(brCtx, W * 0.48, H * 0.665, 58, false);

  // --- SPINE ALBEDO & BUMP ---
  const SW = 256;
  const SH = 1408;
  const spineCanvas = document.createElement("canvas");
  spineCanvas.width = SW;
  spineCanvas.height = SH;
  const sCtx = spineCanvas.getContext("2d")!;
  paintProceduralLinenBase(sCtx, SW, SH, "#3A4046", linenImage);

  // Subtle horizontal raised-band shadows near head & tail
  sCtx.fillStyle = "rgba(0,0,0,0.28)";
  sCtx.fillRect(0, 175, SW, 6);
  sCtx.fillRect(0, SH - 181, SW, 6);
  sCtx.fillStyle = "rgba(225,229,229,0.12)";
  sCtx.fillRect(0, 172, SW, 2);
  sCtx.fillRect(0, SH - 184, SW, 2);

  // Vertical PAHINA spine stamp
  sCtx.save();
  sCtx.translate(SW / 2, SH / 2);
  sCtx.rotate(-Math.PI / 2);
  sCtx.font = '400 44px "Bodoni Moda", Georgia, serif';
  sCtx.textAlign = "center";
  sCtx.textBaseline = "middle";
  sCtx.fillStyle = "rgba(14, 17, 20, 0.72)";
  drawTrackedText(sCtx, "PAHINA", 0, 2, 22);
  sCtx.fillStyle = "rgba(225, 229, 229, 0.42)";
  drawTrackedText(sCtx, "PAHINA", 0, 0, 22);
  sCtx.restore();

  const spineBumpCanvas = document.createElement("canvas");
  spineBumpCanvas.width = SW;
  spineBumpCanvas.height = SH;
  const sbCtx = spineBumpCanvas.getContext("2d")!;
  sbCtx.fillStyle = "#8C8C8C";
  sbCtx.fillRect(0, 0, SW, SH);
  sbCtx.fillStyle = "#B8B8B8";
  sbCtx.fillRect(0, 172, SW, 8);
  sbCtx.fillRect(0, SH - 184, SW, 8);
  sbCtx.save();
  sbCtx.translate(SW / 2, SH / 2);
  sbCtx.rotate(-Math.PI / 2);
  sbCtx.font = '400 44px "Bodoni Moda", Georgia, serif';
  sbCtx.textAlign = "center";
  sbCtx.textBaseline = "middle";
  sbCtx.fillStyle = "#282828";
  drawTrackedText(sbCtx, "PAHINA", 0, 0, 22);
  sbCtx.restore();

  // --- UNCOATED PAGE BLOCK EDGE TEXTURE ---
  const PW = 256;
  const PH = 1024;
  const pagesCanvas = document.createElement("canvas");
  pagesCanvas.width = PW;
  pagesCanvas.height = PH;
  const pCtx = pagesCanvas.getContext("2d")!;
  pCtx.fillStyle = "#E6E1D6";
  pCtx.fillRect(0, 0, PW, PH);

  // Fine stacked uncoated paper leaf striations
  for (let x = 0; x < PW; x += 2) {
    const shade = 205 + Math.round(Math.sin(x * 1.9) * 14 + Math.cos(x * 0.47) * 9);
    pCtx.fillStyle = `rgb(${shade + 12}, ${shade + 8}, ${shade - 2})`;
    pCtx.fillRect(x, 0, 1.5, PH);
  }
  // Subtle deckle edge shading at top/bottom
  const pageGrad = pCtx.createLinearGradient(0, 0, PW, 0);
  pageGrad.addColorStop(0, "rgba(0,0,0,0.16)");
  pageGrad.addColorStop(0.12, "rgba(0,0,0,0)");
  pageGrad.addColorStop(0.88, "rgba(0,0,0,0)");
  pageGrad.addColorStop(1, "rgba(0,0,0,0.16)");
  pCtx.fillStyle = pageGrad;
  pCtx.fillRect(0, 0, PW, PH);

  const configureColorTex = (canvas: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    t.needsUpdate = true;
    return t;
  };

  const configureDataTex = (canvas: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.NoColorSpace;
    t.anisotropy = 4;
    t.needsUpdate = true;
    return t;
  };

  const frontMap = configureColorTex(frontCanvas);
  const frontBump = configureDataTex(frontBumpCanvas);
  const frontRoughness = configureDataTex(frontRoughCanvas);
  const backMap = configureColorTex(backCanvas);
  const backBump = configureDataTex(backBumpCanvas);
  const backRoughness = configureDataTex(backRoughCanvas);
  const spineMap = configureColorTex(spineCanvas);
  const spineBump = configureDataTex(spineBumpCanvas);
  const pagesMap = configureColorTex(pagesCanvas);

  return {
    frontMap,
    frontBump,
    frontRoughness,
    backMap,
    backBump,
    backRoughness,
    spineMap,
    spineBump,
    pagesMap,
    dispose: () => {
      frontMap.dispose();
      frontBump.dispose();
      frontRoughness.dispose();
      backMap.dispose();
      backBump.dispose();
      backRoughness.dispose();
      spineMap.dispose();
      spineBump.dispose();
      pagesMap.dispose();
    },
  };
}

function drawTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  tracking: number
) {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const totalWidth =
    widths.reduce((acc, w) => acc + w, 0) + tracking * Math.max(0, chars.length - 1);

  let cursor = cx - totalWidth / 2;
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cursor + widths[i] / 2, cy);
    cursor += widths[i] + tracking;
  }
}
