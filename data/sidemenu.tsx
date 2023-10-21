//icons
import { BsStar, BsBookmark } from 'react-icons/bs'
import { PiUserCircleGear, PiNewspaperLight, PiArticleMediumDuotone, PiFireLight } from 'react-icons/pi'
import { GoHistory } from 'react-icons/go'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaConnectdevelop } from 'react-icons/fa'
import { LiaCommentSolid } from 'react-icons/lia'


export const discoverData = [
    {
        title: 'Popular',
        icon: <PiFireLight size={23} />,
        link: '/popular'
    },
    {
        title: 'Most Viewed',
        icon: <BsStar size={23} />,
        link: '/most-viewed'
    },
    {
        title: 'Best Authors',
        icon: <PiUserCircleGear size={23} />,
        link: '/best-authors'
    },
    {
        title: 'Latest News',
        icon: <PiNewspaperLight size={23} />,
        link: '/latest-news'
    },
    {
        title: 'Technology',
        icon: <FaConnectdevelop size={23} />,
        link: '/technology'
    },
]

export const contributeData = [
    {
        title: 'Post article',
        icon: <PiArticleMediumDuotone size={23} />,
        link: '/post-article'
    },
    {
        title: 'Give Suggestion',
        icon: <LiaCommentSolid size={23} />,
        link: '/give-suggestion'
    },
]

export const manageData = [
    {
        title: 'Reading History',
        icon: <GoHistory size={23} />,
        link: '/reading-history'
    },
    {
        title: 'Bookmark',
        icon: <BsBookmark size={23} />,
        link: '/bookmark'
    },

]

// {
//     title: 'Customize',
//     icon: <IoSettingsOutline size={23} />,
//     link: '/customize'
// },