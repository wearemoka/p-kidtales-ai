'use client'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'next-share'

// Interface of expected params
interface Props {
    urlToShare: string,
    quote: string,
    hashtags: string[]
}

function ShareContent ({ urlToShare, quote, hashtags }:Props) {
  return (
    <div>
      <FacebookShareButton
        url={urlToShare}
        quote={quote}
        hashtag={hashtags[0]} // Facebook only permit one Hashtag
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={urlToShare}
        title={quote}
        hashtags={hashtags}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={urlToShare}
        title={quote}
        separator=' - '
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={urlToShare}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>

  )
}

export default ShareContent
