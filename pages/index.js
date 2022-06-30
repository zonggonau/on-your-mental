import React, { useEffect, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import PageTitle from '@/components/PageTitle'
import LatestVideo from '@/components/latestVideo'
import Card from '@/components/Card'
import apiHeroYoutubeList from '@/lib/apiHeroYoutubeList'
import Loader from '@/components/Loader'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const [details, setDetails] = useState()

  useEffect(() => {
    // gets list of videos from youtube channel
    // returns lst of 7 most recent videos
    const fetchVideosList = async () => {
      try {
        const result = await apiHeroYoutubeList()
        setDetails(result)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchVideosList()

    // get description from latest video
    // should only contain relevant information about the episode
    function getDescription(str) {
      const descriptionArr = str.split('\n').filter((item) => item)
      let index = descriptionArr.findIndex((v) => v.includes('Welcome back to On Your Mental')) + 1
      return descriptionArr[index]
    }
  }, [])

  if (!details) {
    return <Loader />
  }
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex w-full flex-col ">
        <div className="space-y-2 pb-4 md:space-y-5">
          <PageTitle>Welcome to On Your Mental</PageTitle>

          <p className="prose m-4 max-w-none pb-4 text-center text-lg leading-7 text-gray-700">
            A podcast that shares candid and open conversations between & about men and what's on
            their minds! Ranging from something they're working on, something they're thinking
            about, to relationships or general feelings. All of it's on the table!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center divide-y divide-gray-700 sm:content-center">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Episode
          </h1>
          <LatestVideo />
        </div>
        <div className="container py-12 ">
          <h3 className="flex pb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            Previous Episodes
          </h3>
          <div className="grid justify-center gap-2 md:grid-cols-3">
            {details.slice(1).map((d) => (
              <div
                className="rounded-lg bg-gradient-to-b from-gray-900 to-ORMblue  p-1 shadow-lg"
                key={d.snippet.title}
              >
                <Card
                  key={d.snippet.title}
                  title={d.snippet.title}
                  publishedAt={d.snippet.publishedAt}
                  imgSrc={d.snippet.thumbnails.medium.url}
                  href={`https://www.youtube.com/watch?v=${d.id.videoId}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
