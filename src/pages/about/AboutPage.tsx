import avatarJpg from '@/assets/avatar.jpg'
import avatarPng from '@/assets/avatar.png'
import AvatarSvg from '@/assets/avatar.svg?react'

const AboutPage = () => {
  return (
    <div>
      <div>
        <AvatarSvg width={360} height={360} />
        <img src={avatarJpg} width={360} height={360} alt='avatarjpg' />
        <img src={avatarPng} width={360} height={360} alt='avatarpng' />
      </div>
      <h1>about page</h1>
    </div>
  )
}

export default AboutPage
