# 💿 CD Envelope Player — Framer Component

A tactile, editorial music player for Framer that turns audio playback into a physical CD interaction.

The CD begins inside a paper-style sleeve, slides outward, and spins while the track is playing. The compact player card keeps the controls minimal while still giving visitors real audio playback, progress seeking, timing, and keyboard interaction.

**Made with 💛 by Karim Saif**

## ✨ Preview

**Live demo:** https://cdenvelopeplayer.framer.website/

**Framer Community:** https://www.framer.com/community/posts/UU22T8bqXqM7bQg6PZ586f/

**Get the component:** https://karimsaif.lemonsqueezy.com/checkout/buy/109c3682-adbe-4bef-aacf-804d8c641205

## 🎧 What it does

CD Envelope Player combines a physical-media metaphor with a modern Framer interaction:

- 💿 Animated CD sliding out of a sleeve
- 🔄 CD rotation while audio is playing
- ▶️ Real audio playback with play/pause
- ↩️ Restart control
- ⏭️ 30-second skip-forward control
- 📈 Interactive progress seeking
- ⌨️ Keyboard-accessible progress controls
- ⏱️ Current time and total duration
- 🎚️ Configurable playback volume
- 🎵 Track title and artist information
- 📊 Animated equalizer indicator
- 📱 Responsive scaling for narrower frames
- ♿ Reduced-motion support
- 🖼️ Static-renderer handling for Framer previews and exports
- 🎨 Extensive customization through Framer Property Controls

## 🧩 Built for Framer

Designed to work directly inside Framer without an external UI framework.

It uses:

- Framer Property Controls
- Native HTML audio
- Framer Motion
- Responsive layout handling
- Native pointer events for seeking
- Keyboard interaction
- Reduced-motion handling
- Static-renderer safeguards
- Audio lifecycle cleanup when the source changes

Upload audio directly through the **Music** property control.

## 🎛️ Customization

### Audio

| Control | Description |
| --- | --- |
| **Music** | Upload MP3, WAV, OGG, M4A, or AAC audio |
| **Title** | Track title shown in the player |
| **Artist** | Artist name shown below the title |
| **Fallback Duration** | Backup duration when audio metadata is unavailable |
| **Start At** | Initial playback position |
| **Auto Play** | Attempts playback after the CD animation |
| **Volume** | Playback volume |

### CD animation

| Control | Description |
| --- | --- |
| **Disc Size** | Changes the CD diameter |
| **Slide Distance** | Controls how far the CD exits the sleeve |
| **Slide Duration** | Controls the slide-out timing |
| **Spin Speed** | Controls CD rotation speed while playing |

### Player layout

| Control | Description |
| --- | --- |
| **Card Gap** | Space between the CD stage and player card |
| **Card Radius** | Player card corner radius |
| **Card Padding** | Internal card spacing |
| **Sleeve Radius** | CD sleeve corner radius |

### Visibility

Toggle individual parts of the interface:

- Equalizer
- Artist
- Controls
- Progress
- Time

### Colors

Customize:

- Background
- Foreground
- Muted
- Border
- Disc
- Accent

## 🎯 Great for

- Music artist websites
- Album releases
- Record labels
- Creative portfolios
- Music discovery pages
- Editorial websites
- Experimental landing pages
- Creative studios
- Digital album experiences
- Premium Framer projects
- Personal portfolios
- Interactive case studies

## 🖱️ Interaction

**Playback**
- Play and pause
- Restart from the beginning
- Skip forward by 30 seconds

**Progress**
- Click or drag across the progress bar
- Use `←` / `→` to seek
- Hold `Shift` with arrow keys for larger seeking steps
- Use `Home` to jump to the beginning
- Use `End` to jump to the end
- Press `Space` or `Enter` when focused to toggle playback

## ♿ Accessibility & motion

The component includes:

- Semantic button labels
- Accessible progress-slider semantics
- Keyboard seeking
- Visible focus treatment
- Reduced-motion support
- Static-renderer behavior
- Disabled interactive controls when no audio is supplied

## 📐 Responsive behavior

The CD stage automatically scales down inside narrower Framer frames, helping preserve the composition instead of forcing the CD outside the available width.

The player card remains fluid and keeps its content from overflowing.

## 🛠️ Source

Main source file:

`KarimSaifCDEnvelopePlayer.tsx`

Component:

`KarimSaifCDEnvelopePlayer`

## 🚀 Installation

1. Add `KarimSaifCDEnvelopePlayer.tsx` to your Framer project.
2. Add the component to your canvas.
3. Upload audio through **Music**.
4. Customize title and artist.
5. Tune CD animation and player styling.
6. Publish your project.

## 📦 Supported audio formats

The Music control accepts:

- MP3
- WAV
- OGG
- M4A
- AAC

Actual playback support can vary by browser and codec.

## ⚠️ Autoplay note

Browsers may block audio autoplay, especially when audio is not muted or when the visitor has not interacted with the page.

The component attempts autoplay when enabled, but the browser ultimately determines whether playback can begin automatically.

## 💛 Credits

Created and customized for Framer by **Karim Saif**.

**Preview:** https://cdenvelopeplayer.framer.website/

**Framer Community:** https://www.framer.com/community/posts/UU22T8bqXqM7bQg6PZ586f/

**Purchase:** https://karimsaif.lemonsqueezy.com/checkout/buy/109c3682-adbe-4bef-aacf-804d8c641205

---

If this component helps your next Framer project, share what you build with it.
