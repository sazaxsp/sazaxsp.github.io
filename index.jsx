import { useEffect, useState } from 'react'

export default function RobloxGiveawayLP() {
  const [offers, setOffers] = useState<any[]>([])
  const [leadStatus, setLeadStatus] = useState('Waiting for completion...')
  const [step, setStep] = useState(1)
  const [liveMessage, setLiveMessage] = useState(
    '🔥 xDarkPlayer just entered the giveaway'
  )

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 33
  })

  const winners = [
    {
      name: 'ShadowPlays',
      prize: '1700 Robux Gift Card'
    },
    {
      name: 'PixelKing',
      prize: '800 Robux Prize'
    },
    {
      name: 'NovaBuilder',
      prize: '1 Month Premium'
    }
  ]

  useEffect(() => {
    fetch(
      'https://de6jvomfbm0af.cloudfront.net/public/offers/feed.php?user_id=354591&api_key=6b29d7158039c22af8fcd52569ff9a77&s1=&s2=&format=json'
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedOffers = data
          .filter((offer: any) => offer.conversion)
          .sort((a: any, b: any) => {
            const aValue =
              parseFloat(String(a.conversion).replace(/[^0-9.]/g, '')) || 0

            const bValue =
              parseFloat(String(b.conversion).replace(/[^0-9.]/g, '')) || 0

            return bValue - aValue
          })

        setOffers(sortedOffers.slice(0, 5))
      })
      .catch((err) => console.log(err))

    const interval = setInterval(() => {
      fetch(
        'https://de6jvomfbm0af.cloudfront.net/public/external/check2.php?testing=0&format=json'
      )
        .then((res) => res.json())
        .then((leads) => {
          if (leads.length > 0) {
            setLeadStatus('Offer completed successfully!')
          }
        })
        .catch((err) => console.log(err))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59

          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59

            if (hours > 0) {
              hours--
            }
          }
        }

        return {
          hours,
          minutes,
          seconds
        }
      })
    }, 1000)

    const messages = [
      '🔥 xDarkPlayer just entered the giveaway',
      '🎉 Sarah unlocked bonus entries',
      '⚡ New winner selected 2 minutes ago',
      '🎮 PixelKing joined the event',
      '💎 VIP reward unlocked by NovaBuilder'
    ]

    const activityInterval = setInterval(() => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)]

      setLiveMessage(randomMessage)
    }, 4000)

    return () => {
      clearInterval(timer)
      clearInterval(activityInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),transparent_50%)]"></div>

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-400/20 rounded-full px-5 py-2 text-green-300 text-sm font-semibold mb-5 animate-pulse backdrop-blur-xl">
            🎮 WEEKLY ROBLOX GIVEAWAY EVENT
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            WIN FREE
            <span className="block text-green-400">
              ROBLOX GIFT CARDS
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="bg-red-500/10 border border-red-400/20 text-red-300 px-5 py-2 rounded-full text-sm font-bold animate-pulse">
              ⏰ Ends In{' '}
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Join thousands of Roblox players entering our weekly giveaway
            for Robux gift cards, premium memberships, and exclusive gaming
            rewards.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button className="bg-green-500 hover:bg-green-400 text-black font-black text-xl px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-500/20">
              ENTER GIVEAWAY
            </button>

            <button className="border border-white/20 hover:border-green-400 hover:bg-green-400/10 text-white font-semibold text-lg px-8 py-5 rounded-2xl transition-all duration-300">
              VIEW WINNERS
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 backdrop-blur-xl text-sm text-gray-300 animate-pulse">
              {liveMessage}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
              <div className="text-3xl font-black text-green-400">
                2847+
              </div>
              <div className="text-gray-400 text-sm">
                Online Players
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
              <div className="text-3xl font-black text-cyan-400">
                500+
              </div>
              <div className="text-gray-400 text-sm">Winners</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
              <div className="text-3xl font-black text-yellow-300">
                24H
              </div>
              <div className="text-gray-400 text-sm">Remaining</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
          <h2 className="text-4xl font-black text-center mb-3">
            Enter Giveaway
          </h2>

          <p className="text-center text-gray-400 mb-10">
            Complete the steps below to participate.
          </p>

          <div className="space-y-6 relative">
            <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-4 text-center text-green-300 font-bold animate-pulse">
              Step {step} of 3 • Complete your entry below
            </div>

            <div className="absolute -top-16 right-0 bg-green-500 text-black font-black px-4 py-2 rounded-full shadow-lg animate-bounce text-sm">
              +3 BONUS ENTRIES
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Roblox Username
              </label>

              <input
                type="text"
                placeholder="Example: Gamer123"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Select Reward
              </label>

              <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-400">
                <option>800 Robux Gift Card</option>
                <option>1700 Robux Gift Card</option>
                <option>Roblox Premium</option>
                <option>Exclusive Gaming Bundle</option>
              </select>
            </div>

            <div className="space-y-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>Follow our TikTok page</span>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>Join our Discord community</span>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>Subscribe to our YouTube channel</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:scale-[1.02] transition-all duration-300 text-black font-black text-2xl py-5 rounded-2xl shadow-2xl shadow-green-500/30 animate-pulse"
            >
              CONTINUE ENTRY
            </button>

            {step >= 2 && (
              <>
                <div className="bg-black/40 border border-green-400/20 rounded-3xl p-6 animate-pulse">
                  <div className="text-center text-green-400 font-black text-2xl mb-4">
                    Verifying Giveaway Entry...
                  </div>

                  <div className="space-y-3 text-sm text-green-300 font-mono">
                    <div>✔ Checking eligibility...</div>
                    <div>✔ Reserving reward slot...</div>
                    <div>✔ Activating bonus entries...</div>
                  </div>
                </div>

                <div className="mt-8 bg-black/40 border border-green-400/20 rounded-3xl p-6">
                  <h3 className="text-2xl font-black text-green-400 mb-4 text-center">
                    Unlock Bonus Entries
                  </h3>

                  <p className="text-center text-gray-400 mb-6">
                    Complete one sponsored task below to unlock bonus giveaway entries.
                  </p>

                  <div className="space-y-4">
                    {offers.map((offer: any, index) => (
                      <a
                        key={index}
                        href={offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/5 hover:bg-green-400/10 border border-white/10 hover:border-green-400/30 rounded-2xl p-5 transition-all duration-300"
                      >
                        <div className="font-bold text-lg text-white mb-1">
                          {offer.anchor}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="text-green-400 text-sm font-bold">
                            Reward: {offer.conversion}
                          </div>

                          <div className="bg-green-500/10 border border-green-400/20 text-green-300 text-xs px-3 py-1 rounded-full font-bold">
                            HIGH EPC
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 bg-green-500/10 border border-green-400/20 rounded-2xl p-4 text-center text-yellow-300 font-semibold animate-pulse">
                    {leadStatus}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">
            Available Rewards
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-400/20 rounded-3xl p-8 text-center backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop"
                alt="Reward"
                className="w-full h-40 object-cover rounded-2xl mb-5"
              />

              <div className="text-3xl font-black text-green-400 mb-3">
                800 Robux
              </div>
            </div>

            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400/20 rounded-3xl p-8 text-center backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop"
                alt="Reward"
                className="w-full h-40 object-cover rounded-2xl mb-5"
              />

              <div className="text-3xl font-black text-cyan-400 mb-3">
                1700 Robux
              </div>
            </div>

            <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-400/20 rounded-3xl p-8 text-center backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
                alt="Reward"
                className="w-full h-40 object-cover rounded-2xl mb-5"
              />

              <div className="text-3xl font-black text-yellow-300 mb-3">
                Premium Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winners */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/10 border border-green-400/20 rounded-full px-5 py-2 text-green-300 text-sm font-bold">
              VERIFIED WINNERS
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-12">
            Recent Winners
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {winners.map((winner, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 mx-auto mb-5"></div>

                <div className="text-center">
                  <div className="text-xl font-black text-green-400 mb-2">
                    {winner.name}
                  </div>

                  <div className="text-gray-300">
                    Won: {winner.prize}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%]">
        <button className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-2xl shadow-2xl shadow-green-500/30 animate-pulse text-lg">
          🎁 ENTER GIVEAWAY
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-gray-400">
        <p className="text-lg font-semibold text-white mb-4">
          Giveaway Rules & Disclaimer
        </p>

        <p className="max-w-4xl mx-auto text-sm leading-relaxed mb-4">
          Winners are selected randomly. Participants must follow the listed
          steps to qualify. This giveaway is not sponsored, endorsed, or
          administered by Roblox Corporation.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <a href="#" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-green-400 transition-colors">
            Terms of Service
          </a>

          <a href="#" className="hover:text-green-400 transition-colors">
            Contact
          </a>

          <a href="#" className="hover:text-green-400 transition-colors">
            Disclaimer
          </a>
        </div>

        <p className="text-xs opacity-70">
          © 2026 Roblox Giveaway Community. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
