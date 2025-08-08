import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm text-center py-8 px-5">
        <Image
          src="/profile.png"
          alt="Erick Arias"
          width={200}
          height={200}
          className="w-50 h-50 rounded-full object-cover mx-auto mb-3"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Erick Arias</h1>
        <p className="text-lg text-gray-600 mb-1">Junior Developer</p>
        <p className="text-gray-500">Cúcuta, Norte de Santander</p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-5">
        {/* About Me Section */}
        <Card className="mb-8 rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              Passionate and committed Full Stack Developer with experience in web application development using
              technologies such as JavaScript and Node.js. I stand out for my ability to work on both frontend and
              backend, integrating efficient and user-centered solutions. I possess interpersonal skills that foster
              teamwork, as well as a proactive mindset oriented to constant learning.
            </p>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="mb-8 rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Experience</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Creative Solutions Co.</strong> (2018 - 2020)
              </li>
              <li>
                <strong>Tech Innovators Inc.</strong> (2020 - Present)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-8 rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Skills</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {["Programming", "Databases", "Backend Dev", "Cloud Computing", "Version Control"].map((skill) => (
                  <span key={skill} className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {["Communication", "Teamwork", "Problem Solving", "Public Speaking", "Time Management"].map((skill) => (
                  <span key={skill} className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-8 rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Featured Projects</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
                <Image
                  src="/ecoTrack.png"
                  alt="EcoTrack"
                  width={300}
                  height={200}
                  className="w-full rounded-lg mb-3 object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">EcoTrack</h3>
                <p className="text-gray-600 text-sm">App to track carbon footprint and sustainable lifestyle.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
                <Image
                  src="/healthHub.png"
                  alt="HealthHub"
                  width={300}
                  height={200}
                  className="w-full rounded-lg mb-3 object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">HealthHub</h3>
                <p className="text-gray-600 text-sm">Web platform for personalized health insights.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
                <Image
                  src="/travelMate.png"
                  alt="TravelMate"
                  width={300}
                  height={200}
                  className="w-full rounded-lg mb-3 object-cover"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">TravelMate</h3>
                <p className="text-gray-600 text-sm">Mobile app to organize trips and recommendations.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mb-8 rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Contact</h2>
            <p className="text-gray-700 mb-6">
              {
                "I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out, and I'll get back to you as soon as possible."
              }
            </p>
            <form className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full p-3 rounded-lg border border-gray-300 resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
