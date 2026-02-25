import Link from 'next/link'
import WhatsAppContactIcon from '@/assets/whats-app-contact.svg'

export default function WhatsAppContact() {
  return (
    <div className="fixed bottom-24 right-4 md:right-10">
      <Link href="https://wa.me/+96176425951" target="_blank">
        <WhatsAppContactIcon className="" />
      </Link>
    </div>
  )
}
