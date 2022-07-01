import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import he from 'he'
import Image from '@/components/Image'
import { BsInstagram, BsEnvelope } from 'react-icons/bs'

export default function Contact() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="flex h-screen flex-col items-center">
        <div className="space-y-2 py-4 md:space-y-5">
          <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-6xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>
        <h3 className="max-w-sm py-4 text-center text-gray-700 md:max-w-lg">
          If there’s a topic you want to see covered, or a question answered directly or in a video,
          we want to hear from you! Send us an email, or DM us on Instagram, and we’ll get back to
          you!
        </h3>
        <div>
          <div className="grid auto-rows-fr grid-cols-1 items-center gap-5 py-4 md:grid-cols-2">
            <a
              className="flex transform flex-col items-center transition duration-500 hover:scale-105"
              href={`mailto:${siteMetadata.email}`}
            >
              <BsEnvelope size="80" className="text-gray-700 hover:text-primary-400" />
            </a>
            <a
              className="flex transform flex-col items-center transition duration-500 hover:scale-105"
              href={siteMetadata.instagram}
            >
              <BsInstagram size="80" className=" text-gray-700 hover:text-instagramColor" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
