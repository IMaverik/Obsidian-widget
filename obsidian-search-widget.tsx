"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ObsidianSearchWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock suggestions 
  const mockSuggestions = [
    "How to create a new note",
    "Keyboard shortcuts",
    "Markdown syntax",
    "Linking notes together",
    "Using plugins",
    "Customizing themes",
    "Daily notes workflow",
    "Zettelkasten method",
    "Obsidian sync",
    "Embedding content",
  ]

  useEffect(() => {
    // Filter suggestions based on search query
    if (searchQuery.trim() === "") {
      setSuggestions([])
    } else {
      const filtered = mockSuggestions.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      setSuggestions(filtered)
    }
  }, [searchQuery])

  useEffect(() => {
   
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }

    
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    
    const popup = searchRef.current
    if (popup) {
      popup.classList.add("dark")
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Obsidian Logo Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-full bg-black shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center overflow-hidden"
        aria-label="Open search"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wireframe%20%282%29-RT1L0RmVNSun8fWJs822L6gxyU65tT.png"
          alt="Obsidian Logo"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Search - Fixed to center of viewport */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[90%] max-w-2xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden dark"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="w-6 h-6 text-gray-300" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search knowledge base..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-400 text-lg"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Suggestions */}
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="text-sm font-medium text-gray-400 mb-3">Suggestions</div>
                      <ul className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              className="w-full text-left px-4 py-3 rounded-md text-base text-gray-300 hover:bg-gray-700 transition-colors"
                              onClick={() => {
                                setSearchQuery(suggestion)
                                // Handle selection - you can add your logic here
                                console.log(`Selected: ${suggestion}`)
                              }}
                            >
                              {suggestion}
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {searchQuery && suggestions.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-base">No results found</div>
                )}

                {!searchQuery && (
                  <div className="mt-4 py-6 text-center">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wireframe%20%282%29-RT1L0RmVNSun8fWJs822L6gxyU65tT.png"
                        alt="Obsidian Logo"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

