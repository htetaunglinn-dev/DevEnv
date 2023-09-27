import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(options)
  // console.log(session)

  if (!session) {
    redirect('/')
  }

  return (
    <main >

    </main>
  )
}
