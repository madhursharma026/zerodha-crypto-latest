import { useState } from 'react'
import { Element, scroller } from 'react-scroll'
import styles from './GraphArea.module.css' // adjust path as needed

export default function ScrollspyTabs() {
  const [activeTab, setActiveTab] = useState('section1')

  const tabs = [
    { name: 'section1', label: 'Section 1' },
    { name: 'section2', label: 'Section 2' },
  ]

  const scrollTo = (name) => {
    setActiveTab(name)
    scroller.scrollTo(name, {
      duration: 500,
      smooth: true,
      offset: -45,
      containerId: 'chartScrollContainer',
    })
  }

  return (
    <>
      <nav
        className={`${styles.tabs2}`}
        style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 999 }}
      >
        {tabs.map((tab) => (
          <span
            key={tab.name}
            className={activeTab === tab.name ? styles.active : ''}
            onClick={() => scrollTo(tab.name)}
          >
            {tab.label}
          </span>
        ))}
      </nav>

      {/* Sections */}
      <Element name="section1" className="pt-4">
        <div>
          <h1>Section 1</h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ipsa libero voluptates,
          consequuntur est alias doloremque et architecto sed. Dolor, voluptas. Dignissimos
          doloribus nostrum libero ipsa dolorem rerum exercitationem necessitatibus.
        </div>
      </Element>

      <Element name="section2" className="pt-4">
        <div>
          <h1>Section 2</h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ipsa libero voluptates,
          consequuntur est alias doloremque et architecto sed. Dolor, voluptas. Dignissimos
          doloribus nostrum libero ipsa dolorem rerum exercitationem necessitatibus.
        </div>
      </Element>
    </>
  )
}
