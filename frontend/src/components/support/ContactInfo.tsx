import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div>
         <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Email</h3>
                <p className="text-green-700">adventurer2024@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Phone</h3>
                <p className="text-green-700">+91 7709692329</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Address</h3>
                <p className="text-green-700">Andheri,Mumbai,Maharashtra,India.</p>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default ContactInfo
