import Image from 'next/image'
import Link from 'next/link'
import WhatsAppContactIcon from '@/assets/whats-app-contact.svg'

interface WhatsAppContactProps {
  deliveryNumber?: number | null
}

export default function WhatsAppContact({ deliveryNumber }: WhatsAppContactProps) {
  if (deliveryNumber == null) return null

  return (
    <div className="fixed bottom-24 right-4 md:right-10">
      <Link
        href={`https://wa.me/${deliveryNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <Image
          src={WhatsAppContactIcon}
          alt="WhatsApp"
          width={45}
          height={46}
          className="size-11 md:size-12"
        />
      </Link>
    </div>
  )
}
