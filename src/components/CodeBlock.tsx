import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useThemeValue } from '../hooks/theme'
import { Button } from '@nextui-org/react'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

export type CodeBlockProps = {
  code: string
  language: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const codeStyle = useThemeValue(oneLight, oneDark)
  const [isHovering, setIsHovering] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const success = document.execCommand('copy')
    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }
    document.body.removeChild(textArea)
  }
  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <Button
          className='absolute right-4 top-6'
          color={showSuccess ? 'success' : 'default'}
          variant='bordered'
          isIconOnly
          onClick={() => copyToClipboard(code)}
        >
          {showSuccess && <CheckIcon className='size-5' />}
          {!showSuccess && <ClipboardIcon className='size-5' />}
        </Button>
      )}
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={codeStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
