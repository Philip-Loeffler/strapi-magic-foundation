import React from 'react'
import Image from 'next/image'

export const AwardBanner: React.FC = () => {
  return (
    <div className="bg-grayScaleOffWhite text-black p-16 rounded-lg w-full">
      <div className="flex justify-center w-full">
        <div className="flex w-4/6 items-center gap-6">
          <div className="flex flex-col gap-4">
            The Independent Charities Seal of Excellence is awarded to Charities of America that
            have, upon rigorous independent review, been able to certify, on an annual basis that
            they meet the highest standards of public accountability, program effectiveness, and
            cost effectiveness.
            <div>
              These standards include those required by the US Government for inclusion in the
              Combined Federal Campaign, probably the most exclusive fund drive in the world.
            </div>
            <div>
              Of the 1,000,000 charities operating in the United States today, it is estimated that
              fewer than 50,000, or 5 percent, meet or exceed these standards, and, of those, fewer
              than 2,000 have been awarded this Seal. MAGIC's CFC #10388.
            </div>
          </div>
          <Image src={'/certificate.png'} width={114} height={190} alt="Magic Foundation Logo" />
          <Image src={'/seal.png'} width={168} height={126} alt="Magic Foundation Logo" />
        </div>
      </div>
    </div>
  )
}
