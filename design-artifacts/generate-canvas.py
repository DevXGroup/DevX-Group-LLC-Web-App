"""
Orbital Silence — Canvas Expression (Refined)
"""

import math
import random
from reportlab.lib.colors import Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

random.seed(42)

W, H = 1190, 1684  # A2-ish

FONTS = '/Users/devx-acct/.claude/plugins/cache/anthropic-agent-skills/document-skills/00756142ab04/skills/canvas-design/canvas-fonts'
pdfmetrics.registerFont(TTFont('JetBrains', f'{FONTS}/JetBrainsMono-Regular.ttf'))
pdfmetrics.registerFont(TTFont('JetBrains-Bold', f'{FONTS}/JetBrainsMono-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Italiana', f'{FONTS}/Italiana-Regular.ttf'))
pdfmetrics.registerFont(TTFont('IBMPlex', f'{FONTS}/IBMPlexMono-Regular.ttf'))
pdfmetrics.registerFont(TTFont('InstrSerif-It', f'{FONTS}/InstrumentSerif-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Jura', f'{FONTS}/Jura-Light.ttf'))
pdfmetrics.registerFont(TTFont('Poiret', f'{FONTS}/PoiretOne-Regular.ttf'))

OUT = '/Users/devx-acct/Desktop/devx-web/design-artifacts/orbital-silence.pdf'

# Center of composition
CX, CY = W / 2, H * 0.47


def col(r, g, b, a=1):
    return Color(r, g, b, a)


# Palette
BG = col(0.018, 0.018, 0.025)
ACCENT = col(0.8, 1.0, 0.0)


def bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Warm radial center glow
    for i in range(50):
        r = 380 - i * 7
        a = 0.006 * (1 - i / 50)
        c.setFillColor(col(0.07, 0.05, 0.025, a))
        c.circle(CX, CY, r, fill=1, stroke=0)
    # Cool outer vignette
    for i in range(30):
        r = 800 - i * 10
        a = 0.004 * (i / 30)
        c.setFillColor(col(0.01, 0.01, 0.04, a))
        c.circle(CX, CY, r, fill=1, stroke=0)


def grid(c):
    sp = 42
    c.setLineWidth(0.25)
    # Vertical
    for x in range(0, int(W) + 1, sp):
        dx = abs(x - CX)
        fade = max(0.008, 0.035 * (1 - min(dx / 500, 1)))
        c.setStrokeColor(col(1, 1, 1, fade))
        c.line(x, 0, x, H)
    # Horizontal
    for y in range(0, int(H) + 1, sp):
        dy = abs(y - CY)
        fade = max(0.008, 0.035 * (1 - min(dy / 600, 1)))
        c.setStrokeColor(col(1, 1, 1, fade))
        c.line(0, y, W, y)


def orbits(c):
    rings = [
        (90, 0.62, 12),
        (140, 0.58, 10),
        (200, 0.54, 14),
        (275, 0.50, 16),
        (360, 0.46, 18),
        (450, 0.42, 20),
    ]
    for radius, ecc, tilt_deg in rings:
        c.saveState()
        c.translate(CX, CY)
        c.rotate(tilt_deg)
        rx, ry = radius, radius * ecc

        # Draw orbit with varying opacity along path
        steps = 720
        for s in range(steps):
            t0 = 2 * math.pi * s / steps
            t1 = 2 * math.pi * (s + 1) / steps
            x0 = rx * math.cos(t0)
            y0 = ry * math.sin(t0)
            x1 = rx * math.cos(t1)
            y1 = ry * math.sin(t1)

            # Fade along orbit for depth
            phase = (math.sin(t0 * 2) + 1) / 2
            a = 0.02 + phase * 0.05
            c.setStrokeColor(col(1, 1, 1, a))
            c.setLineWidth(0.35)
            c.line(x0, y0, x1, y1)

        c.restoreState()


def particles(c):
    # Dense inner accretion
    for _ in range(1200):
        raw = random.random()
        r = (raw ** 3) * 380 + 5
        angle = random.uniform(0, 2 * math.pi)
        ecc = 0.52 + random.uniform(-0.08, 0.08)
        tilt = math.radians(14)

        lx = r * math.cos(angle)
        ly = r * ecc * math.sin(angle)
        x = CX + lx * math.cos(tilt) - ly * math.sin(tilt)
        y = CY + lx * math.sin(tilt) + ly * math.cos(tilt)

        dist = 1 - min(r / 380, 1)
        size = 0.2 + dist * 2.8 + random.uniform(0, 0.4)
        alpha = dist * 0.35 + random.uniform(0, 0.04)

        # Accent particles near core
        if random.random() < 0.08 and dist > 0.4:
            c.setFillColor(col(0.8, 1.0, 0.0, alpha * 2.2))
            size *= 0.8
        elif random.random() < 0.03 and dist > 0.5:
            # Rare bright white
            c.setFillColor(col(1, 1, 1, min(alpha * 3, 0.6)))
        else:
            # Warm to cool gradient based on distance
            warmth = dist * 0.06
            c.setFillColor(col(1, 1 - warmth * 0.3, 1 - warmth, alpha))

        c.circle(x, y, size, fill=1, stroke=0)

    # Sparse outer halo particles
    for _ in range(150):
        r = random.uniform(350, 520)
        angle = random.uniform(0, 2 * math.pi)
        x = CX + r * math.cos(angle) * 1.1
        y = CY + r * 0.45 * math.sin(angle)
        size = random.uniform(0.15, 0.6)
        a = random.uniform(0.02, 0.06)
        c.setFillColor(col(1, 1, 1, a))
        c.circle(x, y, size, fill=1, stroke=0)


def void(c):
    # Glow rings around center
    for i in range(35):
        r = 55 - i * 1.2
        if r < 1:
            break
        a = 0.008 * (i / 35) ** 0.5
        c.setFillColor(col(0.8, 1.0, 0.0, a))
        c.circle(CX, CY, r, fill=1, stroke=0)

    # White inner glow
    for i in range(15):
        r = 25 - i * 1.2
        if r < 1:
            break
        a = 0.02 * (i / 15)
        c.setFillColor(col(1, 1, 1, a))
        c.circle(CX, CY, r, fill=1, stroke=0)

    # Void
    c.setFillColor(col(0.01, 0.01, 0.018))
    c.circle(CX, CY, 14, fill=1, stroke=0)

    # Singularity
    c.setFillColor(col(0.8, 1.0, 0.0, 0.9))
    c.circle(CX, CY, 1.0, fill=1, stroke=0)


def stars(c):
    for _ in range(300):
        x = random.uniform(25, W - 25)
        y = random.uniform(25, H - 25)
        dx, dy = x - CX, y - CY
        if math.sqrt(dx * dx + dy * dy) < 300:
            continue
        size = random.uniform(0.15, 0.8)
        a = random.uniform(0.03, 0.15)
        c.setFillColor(col(1, 1, 1, a))
        c.circle(x, y, size, fill=1, stroke=0)


def event_horizon_line(c):
    """Subtle horizontal accent — the disk edge-on, not a bold line."""
    y = CY
    # Soft glow spread
    for i in range(40):
        offset = (i - 20) * 0.12
        progress = 1 - abs(i - 20) / 20
        a = 0.015 * progress * progress
        # Taper at edges
        x_start = W * 0.12
        x_end = W * 0.88
        c.setStrokeColor(col(0.8, 1.0, 0.0, a))
        c.setLineWidth(0.15)
        c.line(x_start, y + offset, x_end, y + offset)

    # Core line — very subtle
    c.setStrokeColor(col(0.8, 1.0, 0.0, 0.06))
    c.setLineWidth(0.4)
    # Taper using segments
    segments = 200
    for s in range(segments):
        t = s / segments
        x = W * 0.15 + t * W * 0.7
        # Bell curve opacity
        center_t = abs(t - 0.5) * 2
        seg_a = 0.06 * (1 - center_t ** 2)
        c.setStrokeColor(col(0.8, 1.0, 0.0, seg_a))
        x2 = W * 0.15 + (s + 1) / segments * W * 0.7
        c.line(x, y, x2, y)


def labels(c):
    c.setFont('JetBrains', 5.2)

    data = [
        (CX + 95, CY + 52, 'OBJ-0017  r = 1.82 au', 0.22),
        (CX - 210, CY + 120, 'PERIHELION  0.41', 0.18),
        (CX + 270, CY - 85, 'v = 29.78 km/s', 0.20),
        (CX - 160, CY - 180, 'T = 365.256 d', 0.18),
        (CX + 170, CY + 165, 'e = 0.0167', 0.16),
        (CX - 300, CY - 45, 'APHELION  1.017', 0.18),
        (CX + 70, CY - 240, 'i = 7.155\u00b0', 0.16),
    ]

    for x, y, text, alpha in data:
        # Thin leader tick
        c.setStrokeColor(col(1, 1, 1, alpha * 0.4))
        c.setLineWidth(0.25)
        c.line(x - 8, y + 2, x - 2, y + 2)
        # Tiny dot at tick start
        c.setFillColor(col(1, 1, 1, alpha * 0.5))
        c.circle(x - 9, y + 2, 0.5, fill=1, stroke=0)
        # Label
        c.setFillColor(col(1, 1, 1, alpha))
        c.drawString(x, y, text)


def crosshairs(c):
    marks = [
        (CX + 195, CY + 70, 3.5),
        (CX - 275, CY - 95, 3),
        (CX + 355, CY - 25, 3),
        (CX - 130, CY + 210, 3.5),
        (CX + 55, CY - 325, 3),
        (CX - 380, CY + 140, 2.5),
    ]
    for mx, my, sz in marks:
        if 35 < mx < W - 35 and 35 < my < H - 35:
            c.setStrokeColor(col(0.8, 1.0, 0.0, 0.18))
            c.setLineWidth(0.35)
            c.line(mx - sz, my, mx + sz, my)
            c.line(mx, my - sz, mx, my + sz)


def title(c):
    # Title — ethereal, thin
    c.setFont('Italiana', 48)
    c.setFillColor(col(1, 1, 1, 0.07))
    t = 'ORBITAL   SILENCE'
    tw = c.stringWidth(t, 'Italiana', 48)
    c.drawString((W - tw) / 2, H - 115, t)

    # Subtitle
    c.setFont('IBMPlex', 6.5)
    c.setFillColor(col(1, 1, 1, 0.14))
    s = 'A  SYSTEMATIC  OBSERVATION  OF  ENGINEERED  EMPTINESS'
    sw = c.stringWidth(s, 'IBMPlex', 6.5)
    c.drawString((W - sw) / 2, H - 136, s)

    # Thin separator under subtitle
    c.setStrokeColor(col(1, 1, 1, 0.04))
    c.setLineWidth(0.3)
    sep_w = 120
    c.line((W - sep_w) / 2, H - 148, (W + sep_w) / 2, H - 148)

    # Catalogue — upper right
    c.setFont('JetBrains', 5.5)
    c.setFillColor(col(1, 1, 1, 0.12))
    c.drawRightString(W - 48, H - 48, 'CAT. NO. 2026-OS-001')
    c.setFont('JetBrains', 5)
    c.setFillColor(col(1, 1, 1, 0.09))
    c.drawRightString(W - 48, H - 59, 'FIELD: GRAVITATIONAL DYNAMICS')
    c.drawRightString(W - 48, H - 69, 'CLASS: ENGINEERED SYSTEM')

    # Bottom annotations
    c.setFont('JetBrains', 5)
    c.setFillColor(col(1, 1, 1, 0.10))
    c.drawString(48, 58, 'OBSERVATION EPOCH   2026.156')
    c.drawString(48, 47, 'COORDINATE SYSTEM   ECLIPTIC J2000.0')
    c.drawString(48, 36, 'RESOLUTION          0.012 arcsec/px')

    c.drawRightString(W - 48, 58, 'PLATE SCALE   0.42\u2033/px')
    c.drawRightString(W - 48, 47, 'INSTRUMENT    ORBITAL SILENCE ARRAY')
    c.drawRightString(W - 48, 36, 'EXPOSURE      \u221e')

    # Poetic whisper
    c.setFont('InstrSerif-It', 13)
    c.setFillColor(col(1, 1, 1, 0.065))
    whisper = 'the architecture of what cannot be seen'
    ww = c.stringWidth(whisper, 'InstrSerif-It', 13)
    c.drawString((W - ww) / 2, 100, whisper)


def frame(c):
    c.setStrokeColor(col(1, 1, 1, 0.045))
    c.setLineWidth(0.25)
    # Ticks — left/right
    for y in range(75, int(H) - 55, 42):
        c.line(28, y, 35, y)
        c.line(W - 35, y, W - 28, y)
    # Ticks — top/bottom
    for x in range(75, int(W) - 55, 42):
        c.line(x, H - 28, x, H - 35)
        c.line(x, 28, x, 35)

    # Corner crosses
    c.setStrokeColor(col(1, 1, 1, 0.06))
    c.setLineWidth(0.35)
    sz = 10
    m = 40
    for cx, cy in [(m, m), (W - m, m), (m, H - m), (W - m, H - m)]:
        c.line(cx - sz, cy, cx + sz, cy)
        c.line(cx, cy - sz, cx, cy + sz)


def scale_bar(c):
    """Small scale reference bar near bottom."""
    bx = W / 2 - 60
    by = 140
    c.setStrokeColor(col(1, 1, 1, 0.1))
    c.setLineWidth(0.4)
    c.line(bx, by, bx + 120, by)
    # End ticks
    c.line(bx, by - 3, bx, by + 3)
    c.line(bx + 120, by - 3, bx + 120, by + 3)
    # Mid tick
    c.line(bx + 60, by - 2, bx + 60, by + 2)
    # Label
    c.setFont('JetBrains', 4.5)
    c.setFillColor(col(1, 1, 1, 0.10))
    c.drawCentredString(bx + 60, by + 6, '100 au')


def arc_traces(c):
    """Fragmentary orbital arcs — ghosts of past trajectories."""
    traces = [
        (220, 25, 70, 0.04, 0.55, 8),
        (330, 140, 55, 0.03, 0.50, -5),
        (160, 210, 90, 0.05, 0.58, 15),
        (420, 70, 40, 0.025, 0.45, -10),
        (280, 290, 50, 0.035, 0.52, 20),
        (130, 330, 35, 0.03, 0.48, -12),
    ]
    for radius, start, sweep, alpha, ecc, tilt in traces:
        c.saveState()
        c.translate(CX, CY)
        c.rotate(tilt)
        c.setLineWidth(0.3)
        p = c.beginPath()
        for i in range(sweep + 1):
            deg = start + i
            rad = math.radians(deg)
            x = radius * math.cos(rad)
            y = radius * ecc * math.sin(rad)
            # Fade at ends
            end_fade = min(i, sweep - i) / min(15, sweep / 2)
            end_fade = min(end_fade, 1)
            if i == 0:
                p.moveTo(x, y)
            else:
                p.lineTo(x, y)
        c.setStrokeColor(col(1, 1, 1, alpha))
        c.drawPath(p, stroke=1, fill=0)
        c.restoreState()


# ─── BUILD ───

c = canvas.Canvas(OUT, pagesize=(W, H))

bg(c)
grid(c)
stars(c)
orbits(c)
arc_traces(c)
event_horizon_line(c)
particles(c)
void(c)
crosshairs(c)
labels(c)
frame(c)
scale_bar(c)
title(c)

c.save()
print(f'Saved: {OUT}')
