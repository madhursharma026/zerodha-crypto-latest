// zerodha-crypto/components/GraphArea/PriceChart.js

import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  HistogramSeries,
} from 'lightweight-charts'
import { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from './GraphArea.module.css'

export default function PriceChart({ data, volumeData, width, height }) {
  const chartRef = useRef(null)
  const candleSeriesRef = useRef(null)
  const volumeSeriesRef = useRef(null)
  const chartContainerRef = useRef(null)
  const [hoveredDate, setHoveredDate] = useState('')
  const [hoveredTime, setHoveredTime] = useState('')
  const [hoveredData, setHoveredData] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const crosshairHandlerRef = useRef(null) // 🔑 keep reference to unsubscribe safely

  const getColors = () => {
    const style = getComputedStyle(document.body)
    return {
      bgColor: style.getPropertyValue('--bg-color')?.trim() || '#ffffff',
      textColor: style.getPropertyValue('--text-color')?.trim() || '#000000',
      borderColor: style.getPropertyValue('--border-color')?.trim() || '#dcdcdc',
    }
  }

  useEffect(() => {
    if (!chartContainerRef.current) return
    const { bgColor, textColor, borderColor } = getColors()

    const chart = createChart(chartContainerRef.current, {
      width: width || chartContainerRef.current.clientWidth,
      height: height || chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor,
        fontSize: 12,
        attributionLogo: false,
      },
      rightPriceScale: {
        borderVisible: false,
        textColor,
        scaleMargins: { top: 0.12, bottom: 0.12 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        rightOffset: 12,
        barSpacing: 6,
        fixLeftEdge: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#758696', width: 1, style: 1 },
        horzLine: { color: '#758696', width: 1, style: 1 },
      },
      grid: {
        vertLines: { color: bgColor },
        horzLines: { color: borderColor },
      },
      handleScroll: false,
      handleScale: false,
    })

    chartRef.current = chart

    candleSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: '#5B9A5D',
      downColor: '#E25F5B',
      borderVisible: false,
      wickUpColor: '#5B9A5D',
      wickDownColor: '#E25F5B',
      priceLineVisible: false,
    })

    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
      scaleMargins: { top: 0.8, bottom: 0 },
      color: (bar) => (bar.close >= bar.open ? '#5B9A5D' : '#E25F5B'),
    })

    return () => {
      // ✅ cleanup properly
      if (crosshairHandlerRef.current && chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(crosshairHandlerRef.current)
      }
      if (chartRef.current) {
        chartRef.current.remove()
      }
      chartRef.current = null
      candleSeriesRef.current = null
      volumeSeriesRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return

    if (!data || data.length === 0) return

    const fixedData = data
      .filter((d) => d.time !== undefined && !isNaN(d.time))
      .sort((a, b) => a.time - b.time)

    candleSeriesRef.current.setData(fixedData)

    if (volumeSeriesRef.current && volumeData) {
      const fixedVolumeData = volumeData
        .filter((d) => d.time !== undefined && !isNaN(d.time))
        .sort((a, b) => a.time - b.time)
      volumeSeriesRef.current.setData(fixedVolumeData)
    }

    chartRef.current.timeScale().fitContent()
  }, [data, volumeData])

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
        chartRef.current.timeScale().fitContent()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return

    const handler = (param) => {
      if (!param || !param.point || !param.time || !param.seriesData.get(candleSeriesRef.current)) {
        setHoveredData(null)
        setHoveredDate('')
        setHoveredTime('')
        return
      }
      const priceData = param.seriesData.get(candleSeriesRef.current)
      const { open, high, low, close } = priceData
      let dateObj
      if (typeof param.time === 'number') {
        dateObj = new Date(param.time * 1000)
      } else {
        const { year, month, day, hours = 0, minutes = 0, seconds = 0 } = param.time
        dateObj = new Date(year, month - 1, day, hours, minutes, seconds)
      }
      setHoveredData({ open, high, low, close })
      setHoveredDate(dateObj.toLocaleDateString())
      setHoveredTime(dateObj.toLocaleTimeString())
      const boundingRect = chartContainerRef.current.getBoundingClientRect()
      setTooltipPos({
        x: boundingRect.left + param.point.x + 10,
        y: boundingRect.top + param.point.y + 10,
      })
    }

    chartRef.current.subscribeCrosshairMove(handler)
    crosshairHandlerRef.current = handler // save handler ref

    return () => {
      if (chartRef.current && handler) {
        chartRef.current.unsubscribeCrosshairMove(handler)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const { bgColor: newBg, textColor: newText, borderColor: newBorder } = getColors()
      chartRef.current?.applyOptions({
        layout: {
          background: { type: ColorType.Solid, color: newBg },
          textColor: newText,
        },
        rightPriceScale: {
          borderVisible: false,
          textColor: newText,
          scaleMargins: { top: 0.12, bottom: 0.12 },
        },
        grid: {
          vertLines: { color: newBg },
          horzLines: { color: newBorder },
        },
        crosshair: {
          vertLine: { color: '#758696', width: 1, style: 1 },
          horzLine: { color: '#758696', width: 1, style: 1 },
        },
      })
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => {
      observer.disconnect()
    }
  }, [])

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-'
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="mb-5 mt-3" style={{ position: 'relative' }}>
      <div
        ref={chartContainerRef}
        className={styles.chartDiv}
        style={{ width: width || '100%', height: height || '400px' }}
      />
      {hoveredData && (
        <Card
          className={styles.toolTipCard}
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          <Card.Body style={{ padding: '15px' }}>
            <Card.Text style={{ margin: 0, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <b>{hoveredDate}</b>
                </div>
                <div>{hoveredTime}</div>
              </div>
              <div style={{ marginTop: 6 }}>
                <div className="mt-1">
                  Price: <strong>{formatNumber(hoveredData.close)}</strong>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}
