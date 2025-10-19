import { usePrivacy } from '@/contexts/PrivacyContext'
import { ColorType, createChart, CrosshairMode, LineSeries, LineType } from 'lightweight-charts'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { MdAutoGraph } from 'react-icons/md'
import styles from './Home.module.css'

export default function MarketCapChart() {
  const chartRef = useRef(null)
  const lineSeriesRef = useRef(null)
  const { privacyMode } = usePrivacy()
  const chartContainerRef = useRef(null)

  const getColors = () => {
    const style = getComputedStyle(document.body)
    return {
      bgColor: style.getPropertyValue('--bg-color')?.trim() || '#000000',
      textColor: style.getPropertyValue('--text-color')?.trim() || '#ffffff',
      borderColor: style.getPropertyValue('--border-color')?.trim() || '#333333',
    }
  }

  useEffect(() => {
    if (!chartContainerRef.current) return
    const { bgColor, textColor, borderColor } = getColors()

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 250,
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor: textColor,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: bgColor },
        horzLines: { color: borderColor },
      },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      handleScroll: false,
      handleScale: false,
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          visible: true,
          labelVisible: false,
          width: 1,
          color: '#888',
          style: 0,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000)
          const month = date.getMonth()
          const isQuarter = [0, 3, 6, 9].includes(month) && date.getDate() === 1
          return isQuarter
            ? date.toLocaleDateString('en-US', {
                month: 'short',
                year: '2-digit',
              })
            : ''
        },
      },
    })

    chartRef.current = chart

    lineSeriesRef.current = chart.addSeries(LineSeries, {
      color: '#2962FF',
      lineWidth: 2,
      lineType: LineType.Curved,
      priceLineVisible: false,
      crossHairMarkerVisible: true,
    })

    // Custom hover label
    const hoverLabel = document.createElement('div')
    hoverLabel.style = `
      position: absolute;
      display: none;
      padding: 4px 8px;
      background: #1c1c1c;
      color: white;
      font-size: 12px;
      border-radius: 4px;
      pointer-events: none;
      z-index: 1000;
      min-width: 160px;
    `
    chartContainerRef.current.style.position = 'relative' // important for absolute positioning
    chartContainerRef.current.appendChild(hoverLabel)

    chart.subscribeCrosshairMove((param) => {
      if (!param?.time || !param.point || !param.seriesData.has(lineSeriesRef.current)) {
        hoverLabel.style.display = 'none'
        return
      }

      const price = param.seriesData.get(lineSeriesRef.current)?.value
      const date = new Date(param.time * 1000)
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

      hoverLabel.innerText = `${price.toFixed(2)} | ${formattedDate}`
      hoverLabel.style.display = 'block'
      hoverLabel.style.left = `${param.point.x}px`
      hoverLabel.style.top = `${param.point.y - 20}px`
      hoverLabel.style.transform = 'translate(-50%, -100%)'
    })

    const fetchData = async () => {
      try {
        const res = await fetch('/api/crypto_market_data')
        const raw = await res.json()
        const prices = raw?.data?.prices || raw?.prices
        if (!prices) {
          console.error('No prices found in API response', raw)
          return
        }
        const data = prices.map(([timestamp, value]) => ({
          time: Math.floor(timestamp / 1000),
          value,
        }))
        lineSeriesRef.current.setData(data)
        chartRef.current.timeScale().fitContent()
        const first = data[0].time
        const last = data[data.length - 1].time
        const padding = Math.floor((last - first) * 0.1)
        chartRef.current.timeScale().setVisibleRange({
          from: first - padding,
          to: last + padding,
        })
      } catch (err) {
        console.error('Failed to fetch chart data:', err)
      }
    }

    fetchData()

    const resizeHandler = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 300)
        chart.timeScale().fitContent()
      }
    }
    window.addEventListener('resize', resizeHandler)

    // ✅ Instant Dark/Light Mode update
    const observer = new MutationObserver(() => {
      const { bgColor: newBg, textColor: newText, borderColor: newBorder } = getColors()
      chart.applyOptions({
        layout: {
          background: { type: ColorType.Solid, color: newBg },
          textColor: newText,
        },
        grid: {
          vertLines: { color: newBg },
          horzLines: { color: newBorder },
        },
        crosshair: {
          vertLine: { color: '#888', width: 1, style: 0 },
          horzLine: { visible: false, labelVisible: false },
        },
      })
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      chart.remove()
      window.removeEventListener('resize', resizeHandler)
      observer.disconnect()
    }
  }, [])

  return (
    <div>
      <p className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}>
        <MdAutoGraph className="fs-4" /> Market overview
      </p>

      <div className="row align-items-center">
        <div className="col-xl-7 col-md-8 mt-5">
          <div ref={chartContainerRef} className={styles.chartDiv}></div>
        </div>

        <div className="col-xl-5 col-md-4 text-center">
          <Image
            src="/artBoard.png"
            alt="Art Board"
            width={100}
            height={100}
            style={{ height: 'auto', maxWidth: '100px' }}
          />
          <p className={styles.textColor}>You don&apos;t have any positions yet</p>
          <Button variant="primary">Get Started</Button>
        </div>
      </div>
    </div>
  )
}
