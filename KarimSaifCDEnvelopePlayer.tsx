/**
 * Made with 💛 by Karim Saif
 * Created and customized for Framer by Karim Saif
 */

import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
} from "framer-motion"

interface Props {
    musicFile: string
    title: string
    artist: string
    duration: number
    startAt: number
    autoPlay: boolean
    volume: number
    discSize: number
    slideDistance: number
    slideDuration: number
    spinSpeed: number
    cardGap: number
    cardRadius: number
    cardPadding: number
    sleeveRadius: number
    showEqualizer: boolean
    showArtist: boolean
    showControls: boolean
    showProgress: boolean
    showTime: boolean
    background: string
    foreground: string
    muted: string
    border: string
    disc: string
    accent: string
}

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)

const formatTime = (value: number) => {
    const total = Math.max(0, Math.floor(value))
    const minutes = Math.floor(total / 60)
    const seconds = total % 60

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function PlayIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
        >
            <path d="M4.25 2.5L11.25 7.5L4.25 12.5V2.5Z" fill="currentColor" />
        </svg>
    )
}

function PauseIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="3.3"
                y="2.5"
                width="2.5"
                height="10"
                rx="0.7"
                fill="currentColor"
            />
            <rect
                x="9.2"
                y="2.5"
                width="2.5"
                height="10"
                rx="0.7"
                fill="currentColor"
            />
        </svg>
    )
}

function RestartIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3.15 5.2A4.65 4.65 0 1 1 3.6 10.6"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
            />
            <path
                d="M3.15 2.85V5.45H5.75"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function NextIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
        >
            <path d="M3.25 2.5L10 7.5L3.25 12.5V2.5Z" fill="currentColor" />
            <rect
                x="11.05"
                y="2.5"
                width="1.7"
                height="10"
                rx="0.6"
                fill="currentColor"
            />
        </svg>
    )
}

function Equalizer({
    active,
    color,
    reducedMotion,
}: {
    active: boolean
    color: string
    reducedMotion: boolean
}) {
    const bars = [5, 9, 6]

    return (
        <span
            aria-hidden="true"
            style={{
                width: 10,
                height: 12,
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                flexShrink: 0,
            }}
        >
            {bars.map((height, index) => (
                <motion.span
                    key={index}
                    style={{
                        width: 2,
                        height,
                        display: "block",
                        borderRadius: 10,
                        backgroundColor: color,
                    }}
                    animate={
                        active && !reducedMotion
                            ? {
                                  height: [4, 11, 6, 12, 4],
                              }
                            : {
                                  height,
                              }
                    }
                    transition={
                        active && !reducedMotion
                            ? {
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: index * 0.15,
                              }
                            : {
                                  duration: 0.15,
                              }
                    }
                />
            ))}
        </span>
    )
}

function PlayerButton({
    label,
    primary = false,
    disabled,
    foreground,
    muted,
    background,
    onClick,
    children,
}: {
    label: string
    primary?: boolean
    disabled: boolean
    foreground: string
    muted: string
    background: string
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <motion.button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            whileTap={disabled ? undefined : { scale: 0.88 }}
            style={{
                width: primary ? 38 : 30,
                height: primary ? 38 : 30,
                padding: 0,
                margin: 0,
                border: 0,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                appearance: "none",
                WebkitAppearance: "none",
                color: primary ? background : muted,
                backgroundColor: primary ? foreground : "transparent",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.45 : 1,
                outline: "none",
            }}
            onFocus={(event) => {
                event.currentTarget.style.boxShadow = `0 0 0 2px ${background}, 0 0 0 4px ${foreground}`
            }}
            onBlur={(event) => {
                event.currentTarget.style.boxShadow = "none"
            }}
        >
            {children}
        </motion.button>
    )
}

export default function KarimSaifCDEnvelopePlayer(props: Props) {
    const {
        musicFile,
        title,
        artist,
        duration,
        startAt,
        autoPlay,
        volume,
        discSize,
        slideDistance,
        slideDuration,
        spinSpeed,
        cardGap,
        cardRadius,
        cardPadding,
        sleeveRadius,
        showEqualizer,
        showArtist,
        showControls,
        showProgress,
        showTime,
        background,
        foreground,
        muted,
        border,
        disc,
        accent,
    } = props

    const staticRenderer = useIsStaticRenderer()
    const reducedMotion = useReducedMotion()

    const rootRef = React.useRef<HTMLDivElement | null>(null)

    const stageRef = React.useRef<HTMLDivElement | null>(null)

    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    const progressRef = React.useRef<HTMLDivElement | null>(null)

    const autoplayRequestedRef = React.useRef(false)

    const metadataReadyRef = React.useRef(false)

    const userInteractingRef = React.useRef(false)

    const positionRef = React.useRef(clamp(startAt, 0, Math.max(1, duration)))

    const totalDuration = Math.max(1, duration)

    const initialPosition = clamp(startAt, 0, totalDuration)

    const [isOut, setIsOut] = React.useState(staticRenderer)

    const [playing, setPlaying] = React.useState(false)

    const [elapsed, setElapsed] = React.useState(initialPosition)

    const [audioDuration, setAudioDuration] = React.useState(0)

    const [audioReady, setAudioReady] = React.useState(false)

    const [stageScale, setStageScale] = React.useState(1)

    const [focusVisible, setFocusVisible] = React.useState(false)

    const rotation = useMotionValue(0)

    const progress = useMotionValue(initialPosition / totalDuration)

    const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")

    const backGradientId = `karimSaifBackGradient-${instanceId}`

    const frontGradientId = `karimSaifFrontGradient-${instanceId}`

    const actualDuration =
        audioReady && audioDuration > 0 ? audioDuration : totalDuration

    const sleeveWidth = Math.min(190, Math.max(155, discSize * 1.76))

    const sleeveHeight = sleeveWidth * 0.663

    const rawStageWidth =
        sleeveWidth + Math.min(Math.max(slideDistance * 0.78, 0), 230)

    const stageHeight = Math.max(sleeveHeight + 28, discSize + 42)

    const stageScaleWidth = Math.max(1, rawStageWidth)

    React.useEffect(() => {
        if (staticRenderer) {
            setStageScale(1)
            return
        }

        const root = rootRef.current
        if (!root) return

        const updateScale = () => {
            const width = root.getBoundingClientRect().width

            if (!Number.isFinite(width) || width <= 0) {
                return
            }

            const available = Math.max(1, width - 16)

            setStageScale(clamp(available / stageScaleWidth, 0.48, 1))
        }

        updateScale()

        const observer = new ResizeObserver(updateScale)

        observer.observe(root)

        return () => {
            observer.disconnect()
        }
    }, [staticRenderer, stageScaleWidth])

    const seek = React.useCallback(
        (value: number) => {
            const length = Math.max(1, actualDuration)

            const next = clamp(value, 0, length)

            positionRef.current = next

            progress.set(next / length)

            setElapsed(next)

            const audio = audioRef.current

            if (!audio) return

            try {
                if (
                    Number.isFinite(audio.duration) ||
                    metadataReadyRef.current
                ) {
                    audio.currentTime = next
                }
            } catch {}
        },
        [actualDuration, progress]
    )

    const playAudio = React.useCallback(async () => {
        const audio = audioRef.current

        if (!audio || !musicFile || staticRenderer) {
            return false
        }

        try {
            await audio.play()
            return true
        } catch {
            setPlaying(false)
            return false
        }
    }, [musicFile, staticRenderer])

    const pauseAudio = React.useCallback(() => {
        const audio = audioRef.current

        if (!audio) return

        audio.pause()
    }, [])

    const togglePlayback = React.useCallback(() => {
        if (!musicFile || staticRenderer) {
            return
        }

        const audio = audioRef.current

        if (!audio) return

        if (audio.paused) {
            void playAudio()
        } else {
            pauseAudio()
        }
    }, [musicFile, staticRenderer, playAudio, pauseAudio])

    React.useEffect(() => {
        const audio = audioRef.current

        if (!audio) return

        audio.volume = clamp(volume, 0, 1)
    }, [volume])

    React.useEffect(() => {
        const audio = audioRef.current

        autoplayRequestedRef.current = false

        metadataReadyRef.current = false

        setAudioReady(false)
        setAudioDuration(0)
        setPlaying(false)

        if (!audio || !musicFile) {
            positionRef.current = initialPosition

            setElapsed(initialPosition)

            progress.set(initialPosition / totalDuration)

            return
        }

        audio.pause()

        audio.removeAttribute("src")
        audio.load()

        audio.preload = "metadata"
        audio.volume = clamp(volume, 0, 1)

        const handleLoadedMetadata = () => {
            const loaded = Number.isFinite(audio.duration) ? audio.duration : 0

            metadataReadyRef.current = loaded > 0

            const next = clamp(startAt, 0, loaded > 0 ? loaded : totalDuration)

            setAudioDuration(loaded)

            setAudioReady(loaded > 0)

            positionRef.current = next

            try {
                audio.currentTime = next
            } catch {}

            progress.set(
                next / Math.max(1, loaded > 0 ? loaded : totalDuration)
            )

            setElapsed(next)

            if (autoplayRequestedRef.current && !staticRenderer) {
                autoplayRequestedRef.current = false

                void audio.play().catch(() => {
                    setPlaying(false)
                })
            }
        }

        const handleCanPlay = () => {
            if (autoplayRequestedRef.current && !staticRenderer) {
                autoplayRequestedRef.current = false

                void audio.play().catch(() => {
                    setPlaying(false)
                })
            }
        }

        const handleTimeUpdate = () => {
            if (userInteractingRef.current) {
                return
            }

            const current = Number.isFinite(audio.currentTime)
                ? audio.currentTime
                : 0

            positionRef.current = current

            const length =
                Number.isFinite(audio.duration) && audio.duration > 0
                    ? audio.duration
                    : totalDuration

            progress.set(clamp(current / Math.max(1, length), 0, 1))

            setElapsed(current)
        }

        const handlePlay = () => {
            setPlaying(true)
        }

        const handlePause = () => {
            setPlaying(false)
        }

        const handleEnded = () => {
            positionRef.current = 0

            progress.set(0)

            setElapsed(0)

            setPlaying(false)

            try {
                audio.currentTime = 0
            } catch {}
        }

        const handleError = () => {
            setPlaying(false)
            setAudioReady(false)
            metadataReadyRef.current = false
            autoplayRequestedRef.current = false
        }

        audio.addEventListener("loadedmetadata", handleLoadedMetadata)

        audio.addEventListener("canplay", handleCanPlay)

        audio.addEventListener("timeupdate", handleTimeUpdate)

        audio.addEventListener("play", handlePlay)

        audio.addEventListener("pause", handlePause)

        audio.addEventListener("ended", handleEnded)

        audio.addEventListener("error", handleError)

        audio.src = musicFile
        audio.load()

        return () => {
            autoplayRequestedRef.current = false

            metadataReadyRef.current = false

            audio.pause()

            audio.removeEventListener("loadedmetadata", handleLoadedMetadata)

            audio.removeEventListener("canplay", handleCanPlay)

            audio.removeEventListener("timeupdate", handleTimeUpdate)

            audio.removeEventListener("play", handlePlay)

            audio.removeEventListener("pause", handlePause)

            audio.removeEventListener("ended", handleEnded)

            audio.removeEventListener("error", handleError)
        }
    }, [
        musicFile,
        startAt,
        totalDuration,
        volume,
        progress,
        initialPosition,
        staticRenderer,
    ])

    React.useEffect(() => {
        if (staticRenderer) {
            setIsOut(true)
            setPlaying(false)

            autoplayRequestedRef.current = false

            audioRef.current?.pause()

            return
        }

        setIsOut(false)
        setPlaying(false)

        autoplayRequestedRef.current = autoPlay && !!musicFile

        const timer = window.setTimeout(() => {
            setIsOut(true)

            if (autoPlay && musicFile) {
                const audio = audioRef.current

                if (!audio) return

                if (metadataReadyRef.current) {
                    const target = clamp(
                        startAt,
                        0,
                        Number.isFinite(audio.duration) && audio.duration > 0
                            ? audio.duration
                            : totalDuration
                    )

                    try {
                        audio.currentTime = target
                    } catch {}

                    autoplayRequestedRef.current = false

                    void audio.play().catch(() => {
                        setPlaying(false)
                    })
                }
            }
        }, 450)

        return () => {
            window.clearTimeout(timer)
        }
    }, [staticRenderer, autoPlay, musicFile, startAt, totalDuration])

    React.useEffect(() => {
        if (staticRenderer) return

        const next = clamp(startAt, 0, actualDuration)

        positionRef.current = next
        setElapsed(next)

        progress.set(next / Math.max(1, actualDuration))

        const audio = audioRef.current

        if (!audio) return

        try {
            if (metadataReadyRef.current || Number.isFinite(audio.duration)) {
                audio.currentTime = next
            }
        } catch {}
    }, [startAt, actualDuration, staticRenderer, progress])

    const updateFromPointer = React.useCallback(
        (clientX: number) => {
            const element = progressRef.current

            if (!element) return

            const rect = element.getBoundingClientRect()

            if (rect.width <= 0) {
                return
            }

            const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)

            seek(ratio * actualDuration)
        },
        [actualDuration, seek]
    )

    const handlePointerDown = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (staticRenderer || !musicFile) {
                return
            }

            userInteractingRef.current = true

            try {
                event.currentTarget.setPointerCapture(event.pointerId)
            } catch {}

            updateFromPointer(event.clientX)
        },
        [musicFile, staticRenderer, updateFromPointer]
    )

    const handlePointerMove = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (!userInteractingRef.current) {
                return
            }

            updateFromPointer(event.clientX)
        },
        [updateFromPointer]
    )

    const releasePointer = React.useCallback(
        (event?: React.PointerEvent<HTMLDivElement>) => {
            if (
                event &&
                event.currentTarget.hasPointerCapture(event.pointerId)
            ) {
                try {
                    event.currentTarget.releasePointerCapture(event.pointerId)
                } catch {}
            }

            userInteractingRef.current = false
        },
        []
    )

    const handlePointerUp = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (!userInteractingRef.current) {
                return
            }

            updateFromPointer(event.clientX)

            releasePointer(event)
        },
        [updateFromPointer, releasePointer]
    )

    const handleProgressKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (staticRenderer || !musicFile) {
                return
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault()

                seek(positionRef.current - (event.shiftKey ? 15 : 5))
            }

            if (event.key === "ArrowRight") {
                event.preventDefault()

                seek(positionRef.current + (event.shiftKey ? 15 : 5))
            }

            if (event.key === "Home") {
                event.preventDefault()
                seek(0)
            }

            if (event.key === "End") {
                event.preventDefault()
                seek(actualDuration)
            }

            if (event.key === " " || event.key === "Enter") {
                event.preventDefault()
                togglePlayback()
            }
        },
        [musicFile, staticRenderer, seek, actualDuration, togglePlayback]
    )

    const handleProgressFocus = React.useCallback(() => {
        setFocusVisible(true)
    }, [])

    const handleProgressBlur = React.useCallback(() => {
        setFocusVisible(false)
    }, [])

    useAnimationFrame((_time, delta) => {
        if (staticRenderer || !playing || !isOut || reducedMotion) {
            return
        }

        const dt = Math.min(delta, 64) / 1000

        rotation.set((rotation.get() + spinSpeed * dt) % 360)
    })

    const sheen = `conic-gradient(
            from 180deg,
            ${disc} 0%,
            ${disc} 8.8%,
            #272727 10.2%,
            #3b3b3b 11.6%,
            #505050 13%,
            #646464 14.4%,
            #4f4f4f 18.2%,
            #3b3b3b 22%,
            ${disc} 31%,
            ${disc} 40%,
            ${disc} 59.5%,
            #272727 61.3%,
            #3b3b3b 63.1%,
            #505050 64.8%,
            #646464 66.6%,
            #4f4f4f 68.7%,
            #393939 70.8%,
            ${disc} 81%,
            ${disc} 100%
        )`

    const grooves =
        "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.075) 0px, rgba(0,0,0,.32) .9px, rgba(255,255,255,.075) 1.8px),repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.025) 0px, rgba(0,0,0,.055) 9px, rgba(255,255,255,.025) 18px),radial-gradient(circle at 50% 50%, transparent 38%, rgba(0,0,0,.3) 100%)"

    const specular =
        "radial-gradient(58% 44% at 30% 20%,rgba(255,255,255,.2),transparent 72%),radial-gradient(44% 34% at 72% 84%,rgba(255,255,255,.09),transparent 72%)"

    const hubSize = discSize * 0.39

    const labelSize = discSize * 0.222

    const holeSize = discSize * 0.072

    const slideTransition = reducedMotion
        ? { duration: 0 }
        : {
              duration: Math.max(0.2, slideDuration),
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }

    const progressValue = clamp(elapsed / Math.max(1, actualDuration), 0, 1)

    const stageScaledWidth = rawStageWidth * stageScale

    return (
        <div
            ref={rootRef}
            style={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: Math.max(0, cardGap),
                padding: 8,
                userSelect: "none",
                fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",sans-serif',
                color: foreground,
            }}
        >
            <audio
                ref={audioRef}
                preload="metadata"
                aria-hidden="true"
                style={{
                    display: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: stageHeight,
                    flexShrink: 1,
                    minHeight: 0,
                    overflow: "visible",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    ref={stageRef}
                    style={{
                        position: "relative",
                        width: rawStageWidth,
                        height: stageHeight,
                        flexShrink: 0,
                        transform: `scale(${stageScale})`,
                        transformOrigin: "center center",
                        marginLeft: (stageScaledWidth - rawStageWidth) / 2,
                        marginRight: (stageScaledWidth - rawStageWidth) / 2,
                    }}
                >
                    <svg
                        viewBox={`0 0 ${sleeveWidth} ${sleeveHeight}`}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: sleeveWidth,
                            height: sleeveHeight,
                            overflow: "visible",
                        }}
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id={backGradientId}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={foreground}
                                    stopOpacity=".34"
                                />
                                <stop
                                    offset="100%"
                                    stopColor={foreground}
                                    stopOpacity=".08"
                                />
                            </linearGradient>
                        </defs>

                        <rect
                            x=".75"
                            y=".75"
                            width={sleeveWidth - 1.5}
                            height={sleeveHeight - 1.5}
                            rx={sleeveRadius}
                            fill={muted}
                            stroke={border}
                            strokeWidth="1.5"
                        />

                        <path
                            d={`M${sleeveWidth * 0.735} ${
                                sleeveHeight * 0.5
                            }L${sleeveWidth} ${
                                sleeveHeight * 0.03
                            }L${sleeveWidth} ${sleeveHeight * 0.97}Z`}
                            fill={`url(#${backGradientId})`}
                        />
                    </svg>

                    <motion.div
                        style={{
                            position: "absolute",
                            left: sleeveWidth * 0.085,
                            top: 16,
                            width: discSize,
                            height: discSize,
                            borderRadius: "50%",
                        }}
                        initial={{
                            x: staticRenderer ? slideDistance : 0,
                        }}
                        animate={{
                            x: isOut ? slideDistance : 0,
                            boxShadow: isOut
                                ? "0 0 0 2px rgba(98,97,94,.8),0 14px 22px -10px rgba(0,0,0,.55)"
                                : "0 0 0 2px rgba(98,97,94,.8)",
                        }}
                        transition={slideTransition}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: 0,
                                overflow: "hidden",
                                borderRadius: "50%",
                                background: sheen,
                                rotate: rotation,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: grooves,
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: hubSize,
                                    height: hubSize,
                                    borderRadius: "50%",
                                    transform: "translate(-50%,-50%)",
                                    background:
                                        "radial-gradient(circle,#2b2718 0%,#211e15 72%)",
                                    boxShadow: "inset 0 0 7px rgba(0,0,0,.65)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: labelSize,
                                    height: labelSize,
                                    borderRadius: "50%",
                                    transform: "translate(-50%,-50%)",
                                    background: `radial-gradient(circle at 50% 32%,${accent} 0%,#bcc092 46%,#949166 100%)`,
                                    boxShadow:
                                        "inset 0 0 0 1px rgba(0,0,0,.14),inset 0 0 4px rgba(94,94,94,.55)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: holeSize,
                                    height: holeSize,
                                    borderRadius: "50%",
                                    transform: "translate(-50%,-50%)",
                                    background:
                                        "radial-gradient(circle at 50% 30%,#171c16 0%,#2d2d2d 62%,#b9b9b9 100%)",
                                    boxShadow:
                                        "0 0 0 1px rgba(214,214,214,.85)",
                                }}
                            />
                        </motion.div>

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                pointerEvents: "none",
                                background: specular,
                                border: "3px solid #373535",
                                boxSizing: "border-box",
                                boxShadow:
                                    "inset 0 0 0 1px rgba(255,255,255,.08),inset 0 -9px 18px rgba(0,0,0,.45)",
                            }}
                        />
                    </motion.div>

                    <svg
                        viewBox={`0 0 ${sleeveWidth} ${sleeveHeight}`}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: sleeveWidth,
                            height: sleeveHeight,
                            pointerEvents: "none",
                            overflow: "visible",
                        }}
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id={frontGradientId}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={background}
                                    stopOpacity=".82"
                                />
                                <stop
                                    offset="52%"
                                    stopColor={background}
                                    stopOpacity=".1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor={foreground}
                                    stopOpacity=".07"
                                />
                            </linearGradient>
                        </defs>

                        <path
                            d={`M${sleeveRadius}.75L${
                                sleeveWidth - sleeveRadius
                            }.75A${sleeveRadius} ${sleeveRadius} 0 0 1 ${
                                sleeveWidth - 0.75
                            } ${sleeveRadius}L${sleeveWidth * 0.735} ${
                                sleeveHeight * 0.5
                            }L${sleeveWidth - 0.75} ${
                                sleeveHeight - sleeveRadius
                            }A${sleeveRadius} ${sleeveRadius} 0 0 1 ${
                                sleeveWidth - sleeveRadius
                            } ${sleeveHeight - 0.75}L${sleeveRadius} ${
                                sleeveHeight - 0.75
                            }A${sleeveRadius} ${sleeveRadius} 0 0 1 .75 ${
                                sleeveHeight - sleeveRadius
                            }L.75 ${sleeveRadius}A${sleeveRadius} ${sleeveRadius} 0 0 1 ${sleeveRadius}.75Z`}
                            fill={muted}
                            stroke={border}
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />

                        <path
                            d={`M${sleeveRadius}.75L${
                                sleeveWidth - sleeveRadius
                            }.75A${sleeveRadius} ${sleeveRadius} 0 0 1 ${
                                sleeveWidth - 0.75
                            } ${sleeveRadius}L${sleeveWidth * 0.735} ${
                                sleeveHeight * 0.5
                            }L${sleeveWidth - 0.75} ${
                                sleeveHeight - sleeveRadius
                            }A${sleeveRadius} ${sleeveRadius} 0 0 1 ${
                                sleeveWidth - sleeveRadius
                            } ${sleeveHeight - 0.75}L${sleeveRadius} ${
                                sleeveHeight - 0.75
                            }A${sleeveRadius} ${sleeveRadius} 0 0 1 .75 ${
                                sleeveHeight - sleeveRadius
                            }L.75 ${sleeveRadius}A${sleeveRadius} ${sleeveRadius} 0 0 1 ${sleeveRadius}.75Z`}
                            fill={`url(#${frontGradientId})`}
                        />

                        <path
                            d={`M.75 ${sleeveHeight * 0.795}L${
                                sleeveWidth * 0.6
                            } ${sleeveHeight * 0.795}`}
                            stroke={border}
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
            </div>

            <div
                style={{
                    width: "100%",
                    maxWidth: 312,
                    boxSizing: "border-box",
                    padding: cardPadding,
                    border: `1px solid ${border}`,
                    borderRadius: cardRadius,
                    backgroundColor: background,
                    flexShrink: 1,
                    minWidth: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        minWidth: 0,
                    }}
                >
                    <div
                        style={{
                            minWidth: 0,
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 7,
                                height: 14,
                            }}
                        >
                            {showEqualizer && (
                                <Equalizer
                                    active={playing && isOut}
                                    color={foreground}
                                    reducedMotion={!!reducedMotion}
                                />
                            )}

                            <span
                                style={{
                                    color: muted,
                                    fontSize: 11,
                                    lineHeight: 1,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {!musicFile
                                    ? "Add music"
                                    : playing
                                      ? "Listening now"
                                      : "Paused"}
                            </span>
                        </div>

                        <div
                            style={{
                                marginTop: 7,
                                color: foreground,
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 1.2,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {title}
                        </div>

                        {showArtist && (
                            <div
                                style={{
                                    marginTop: 4,
                                    color: muted,
                                    fontSize: 12,
                                    lineHeight: 1.2,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {artist}
                            </div>
                        )}
                    </div>

                    {showControls && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexShrink: 0,
                            }}
                        >
                            <PlayerButton
                                label="Restart track"
                                foreground={foreground}
                                muted={muted}
                                background={background}
                                disabled={staticRenderer || !musicFile}
                                onClick={() => seek(0)}
                            >
                                <RestartIcon />
                            </PlayerButton>

                            <PlayerButton
                                label={playing ? "Pause" : "Play"}
                                primary
                                foreground={foreground}
                                muted={muted}
                                background={background}
                                disabled={staticRenderer || !musicFile}
                                onClick={togglePlayback}
                            >
                                {playing ? <PauseIcon /> : <PlayIcon />}
                            </PlayerButton>

                            <PlayerButton
                                label="Skip forward 30 seconds"
                                foreground={foreground}
                                muted={muted}
                                background={background}
                                disabled={staticRenderer || !musicFile}
                                onClick={() => seek(positionRef.current + 30)}
                            >
                                <NextIcon />
                            </PlayerButton>
                        </div>
                    )}
                </div>

                {showProgress && (
                    <div
                        style={{
                            marginTop: 12,
                        }}
                    >
                        <div
                            ref={progressRef}
                            role="slider"
                            tabIndex={staticRenderer || !musicFile ? -1 : 0}
                            aria-label="Audio progress"
                            aria-valuemin={0}
                            aria-valuemax={actualDuration}
                            aria-valuenow={clamp(elapsed, 0, actualDuration)}
                            aria-valuetext={`${formatTime(
                                elapsed
                            )} of ${formatTime(actualDuration)}`}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={releasePointer}
                            onKeyDown={handleProgressKeyDown}
                            onFocus={handleProgressFocus}
                            onBlur={handleProgressBlur}
                            style={{
                                position: "relative",
                                width: "100%",
                                height: 18,
                                display: "flex",
                                alignItems: "center",
                                cursor:
                                    staticRenderer || !musicFile
                                        ? "default"
                                        : "pointer",
                                outline: focusVisible
                                    ? `2px solid ${foreground}`
                                    : "none",
                                outlineOffset: 2,
                                borderRadius: 4,
                                touchAction: "none",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: 4,
                                    overflow: "hidden",
                                    borderRadius: 999,
                                    backgroundColor: `${foreground}22`,
                                }}
                            >
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 999,
                                        backgroundColor: accent,
                                        transformOrigin: "left center",
                                        scaleX: progress,
                                    }}
                                />
                            </div>

                            {!staticRenderer && musicFile && (
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        left: `${progressValue * 100}%`,
                                        top: "50%",
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: accent,
                                        transform: "translate(-50%,-50%)",
                                        pointerEvents: "none",
                                        boxShadow: `0 0 0 2px ${background}`,
                                    }}
                                />
                            )}
                        </div>

                        {showTime && (
                            <div
                                style={{
                                    marginTop: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: muted,
                                    fontSize: 10,
                                    lineHeight: 1,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                <span>{formatTime(elapsed)}</span>

                                <span>{formatTime(actualDuration)}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

KarimSaifCDEnvelopePlayer.defaultProps = {
    musicFile: "",
    title: "Slow Exposure",
    artist: "Marisa Vale",
    duration: 222,
    startAt: 72,
    autoPlay: true,
    volume: 0.8,
    discSize: 108,
    slideDistance: 180,
    slideDuration: 0.9,
    spinSpeed: 168,
    cardGap: 16,
    cardRadius: 12,
    cardPadding: 14,
    sleeveRadius: 9,
    showEqualizer: true,
    showArtist: true,
    showControls: true,
    showProgress: true,
    showTime: true,
    background: "#FFFFFF",
    foreground: "#111111",
    muted: "#777777",
    border: "#D8D8D8",
    disc: "#121212",
    accent: "#B8BC8B",
}

addPropertyControls(KarimSaifCDEnvelopePlayer, {
    musicFile: {
        type: ControlType.File,
        title: "Music",
        description:
            "Upload an audio file that will be played by the CD player.",
        allowedFileTypes: ["mp3", "wav", "ogg", "m4a", "aac"],
    },

    title: {
        type: ControlType.String,
        title: "Title",
        description: "Track title displayed in the player.",
    },

    artist: {
        type: ControlType.String,
        title: "Artist",
        description: "Artist name displayed below the track title.",
    },

    duration: {
        type: ControlType.Number,
        title: "Fallback Duration",
        description:
            "Fallback track duration in seconds when uploaded audio metadata is unavailable.",
        min: 1,
        max: 3600,
        step: 1,
        unit: "sec",
    },

    startAt: {
        type: ControlType.Number,
        title: "Start At",
        description: "Sets the initial playback position in seconds.",
        min: 0,
        max: 3600,
        step: 1,
        unit: "sec",
    },

    autoPlay: {
        type: ControlType.Boolean,
        title: "Auto Play",
        description:
            "Attempts to start playback after the CD slides out. Browser autoplay policies may require user interaction.",
        enabledTitle: "On",
        disabledTitle: "Off",
    },

    volume: {
        type: ControlType.Number,
        title: "Volume",
        description: "Controls the audio playback volume.",
        min: 0,
        max: 1,
        step: 0.01,
    },

    discSize: {
        type: ControlType.Number,
        title: "Disc Size",
        description: "Controls the diameter of the CD.",
        min: 60,
        max: 180,
        step: 1,
        unit: "px",
    },

    slideDistance: {
        type: ControlType.Number,
        title: "Slide Distance",
        description: "Controls how far the CD slides out of the sleeve.",
        min: 40,
        max: 280,
        step: 1,
        unit: "px",
    },

    slideDuration: {
        type: ControlType.Number,
        title: "Slide Duration",
        description: "Controls how long the CD slide-out animation takes.",
        min: 0.2,
        max: 3,
        step: 0.05,
        unit: "s",
    },

    spinSpeed: {
        type: ControlType.Number,
        title: "Spin Speed",
        description:
            "Controls how quickly the CD rotates while audio is playing.",
        min: 30,
        max: 720,
        step: 1,
        unit: "deg/s",
    },

    cardGap: {
        type: ControlType.Number,
        title: "Card Gap",
        description:
            "Controls the vertical distance between the CD stage and the player card.",
        min: 0,
        max: 80,
        step: 1,
        unit: "px",
    },

    cardRadius: {
        type: ControlType.Number,
        title: "Card Radius",
        description: "Controls the corner radius of the player card.",
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
    },

    cardPadding: {
        type: ControlType.Number,
        title: "Card Padding",
        description: "Controls the internal spacing inside the player card.",
        min: 6,
        max: 32,
        step: 1,
        unit: "px",
    },

    sleeveRadius: {
        type: ControlType.Number,
        title: "Sleeve Radius",
        description: "Controls the corner radius of the CD sleeve.",
        min: 0,
        max: 24,
        step: 1,
        unit: "px",
    },

    showEqualizer: {
        type: ControlType.Boolean,
        title: "Equalizer",
        description: "Shows the animated equalizer while the audio is playing.",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },

    showArtist: {
        type: ControlType.Boolean,
        title: "Artist",
        description: "Shows or hides the artist name.",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },

    showControls: {
        type: ControlType.Boolean,
        title: "Controls",
        description:
            "Shows or hides the restart, play/pause, and skip controls.",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },

    showProgress: {
        type: ControlType.Boolean,
        title: "Progress",
        description: "Shows or hides the interactive audio progress bar.",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },

    showTime: {
        type: ControlType.Boolean,
        title: "Time",
        description:
            "Shows or hides the current playback time and total duration.",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },

    background: {
        type: ControlType.Color,
        title: "Background",
        description: "Controls the player card background color.",
    },

    foreground: {
        type: ControlType.Color,
        title: "Foreground",
        description: "Controls the primary text, icons, and interface color.",
    },

    muted: {
        type: ControlType.Color,
        title: "Muted",
        description: "Controls secondary text and the CD sleeve color.",
    },

    border: {
        type: ControlType.Color,
        title: "Border",
        description: "Controls the sleeve and player card border color.",
    },

    disc: {
        type: ControlType.Color,
        title: "Disc",
        description: "Controls the base color of the CD surface.",
    },

    accent: {
        type: ControlType.Color,
        title: "Accent",
        description: "Made with 💛 by [@karimsaif](https://x.com/karimsaif0)",
    },
})