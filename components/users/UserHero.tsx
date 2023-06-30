import React from 'react';
import Image from 'next/image';
import Avatar from '../Avatar';
import useUser from '@/hook/useUser';


interface UserHeroProps{
  userId:string;
}

const UserHero = ({userId}:UserHeroProps) => {
  const {data: fetchUser} = useUser(userId);
  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {fetchUser?.coverImage && (
          <Image src={fetchUser.coverImage}
            alt="Cover Image"
            fill
            style={{
              objectFit:'cover'
            }}
          />
        )}
        <div className='absolute -bottom-16 left-4'>
            <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero