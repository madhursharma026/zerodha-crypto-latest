import { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import styles from './LeftSidebar.module.css'
import SettingsPanel from './SettingsPanel'

export default function SearchBar({ search, setSearch, setFocused }) {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text className={styles.inputGroupStyle}>
          <HiMagnifyingGlass />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search token..."
          value={search}
          className={styles.inputGroupStyle}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          // onBlur removed
        />
        {search && (
          <InputGroup.Text
            className={styles.inputGroupStyle}
            style={{ cursor: 'pointer' }}
            onClick={() => setSearch('')}
          >
            <IoMdClose />
          </InputGroup.Text>
        )}
        <InputGroup.Text
          className={styles.inputGroupStyle}
          style={{ cursor: 'pointer' }}
          onClick={() => setShowFilter(!showFilter)}
        >
          <IoFilterOutline />
        </InputGroup.Text>
      </InputGroup>

      {showFilter && <SettingsPanel />}
    </>
  )
}
