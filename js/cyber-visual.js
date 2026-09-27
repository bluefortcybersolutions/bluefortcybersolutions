/**
 * BlueFort Cyber Solutions - Interactive Cybersecurity Visualizer
 * Renders a subtle, enterprise-grade animated security shield and node defense mesh.
 */

(function () {
  const canvas = document.getElementById('cyberCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height, centerX, centerY;
  let angle = 0;
  let pulseRadius = 0;
  let pulseOpacity = 0.8;

  // Nodes for defensive mesh
  const nodeCount = 14;
  const nodes = [];
  let mouse = { x: null, y: null, active: false };

  function initDimensions() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width || 480;
    height = rect.height || 480;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    centerX = width / 2;
    centerY = height / 2;

    createNodes();
  }

  function createNodes() {
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      const radius = 60 + Math.random() * 110;
      const initialAngle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.4;
      const speed = (Math.random() * 0.003 + 0.002) * (i % 2 === 0 ? 1 : -1);

      nodes.push({
        radius: radius,
        angle: initialAngle,
        speed: speed,
        size: Math.random() * 2 + 2,
        baseSize: Math.random() * 2 + 2,
        pulseOffset: Math.random() * Math.PI
      });
    }
  }

  function drawShieldGeometry() {
    // Outer Bastion Shield Ring
    ctx.save();
    ctx.translate(centerX, centerY);

    // Subtle ambient glow
    const radialGrad = ctx.createRadialGradient(0, 0, 20, 0, 0, 160);
    radialGrad.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
    radialGrad.addColorStop(0.6, 'rgba(37, 99, 235, 0.05)');
    radialGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 160, 0, Math.PI * 2);
    ctx.fill();

    // Outer rotating dotted radar ring
    ctx.save();
    ctx.rotate(angle * 0.4);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Middle rotating tick ring
    ctx.save();
    ctx.rotate(-angle * 0.6);
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 16]);
    ctx.beginPath();
    ctx.arc(0, 0, 115, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Concentric Inner Defense Ring
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Central Hexagonal Cyber Fortress Core
    ctx.save();
    ctx.rotate(angle * 0.2);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.fillStyle = 'rgba(11, 22, 44, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const x = Math.cos(a) * 42;
      const y = Math.sin(a) * 42;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Central Core Pulse Dot
    const corePulse = Math.sin(angle * 3) * 2 + 6;
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, corePulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Scan Pulse Ring
    pulseRadius += 0.75;
    pulseOpacity -= 0.005;
    if (pulseRadius > 170) {
      pulseRadius = 40;
      pulseOpacity = 0.7;
    }
    ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, pulseOpacity)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawNodesAndConnections() {
    const coords = [];

    // Calculate positions
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.angle += node.speed;

      const x = centerX + Math.cos(node.angle) * node.radius;
      const y = centerY + Math.sin(node.angle) * node.radius;
      coords.push({ x, y, size: node.size });
    }

    // Draw connection lines between nearby nodes
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dx = coords[i].x - coords[j].x;
        const dy = coords[i].y - coords[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          const alpha = (1 - dist / 85) * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(coords[i].x, coords[i].y);
          ctx.lineTo(coords[j].x, coords[j].y);
          ctx.stroke();
        }
      }

      // Connect to center if close
      const distToCenter = Math.sqrt(Math.pow(coords[i].x - centerX, 2) + Math.pow(coords[i].y - centerY, 2));
      if (distToCenter < 100) {
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(coords[i].x, coords[i].y);
        ctx.stroke();
      }

      // Mouse interactive link
      if (mouse.active) {
        const mdx = coords[i].x - mouse.x;
        const mdy = coords[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 100) {
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.5 * (1 - mDist / 100)})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(coords[i].x, coords[i].y);
          ctx.stroke();
        }
      }
    }

    // Draw node dots
    for (let i = 0; i < coords.length; i++) {
      const c = coords[i];
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    drawShieldGeometry();
    drawNodesAndConnections();

    angle += 0.015;
    animationFrameId = requestAnimationFrame(render);
  }

  // Mouse move listener
  canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', function () {
    mouse.active = false;
  });

  // Handle Resize
  window.addEventListener('resize', function () {
    initDimensions();
  });

  // Init and Start
  initDimensions();
  render();
})();
