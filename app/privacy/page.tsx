"use client"
import { Shield, Eye, Database, Cookie, Mail, ArrowLeft, Zap, CheckCircle, AlertTriangle, Banana } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Banana className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              resizeimagefast
            </h1>
          </Link>
          <Button
            variant="ghost"
            asChild
            aria-label="Go back to homepage"
            title="Back"
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Back</span>
            </Link>
          </Button>

        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect your data and respect your privacy.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Last updated:</strong> June 24, 2025
          </p>
        </div>

        {/* Privacy Highlights */}
        <div className="mb-12 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2 text-green-800 dark:text-green-200">
            <CheckCircle className="w-5 h-5" />
            <span>Privacy Highlights</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">100% Local Processing</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your images never leave your device - all compression happens in your browser
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">No Data Collection</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  We don't collect, store, or analyze your personal images or data
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">No Account Required</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Use all features without creating an account or providing personal information
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">Minimal Analytics</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Only basic, anonymous usage statistics to improve the service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Eye className="w-6 h-6" />
              <span>Introduction</span>
            </h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="mb-4">
                At resizeimagefast, we believe privacy is a fundamental right. This Privacy Policy explains how we collect,
                use, and protect your information when you use our image compression service.
              </p>
              <p>
                <strong>The short version:</strong> We've designed resizeimagefast to be as privacy-friendly as possible.
                Your images are processed entirely in your browser, never uploaded to our servers, and we collect
                minimal data only to improve our service.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Database className="w-6 h-6" />
              <span>Information We Collect</span>
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>What We DON'T Collect</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• Your images or any visual content you process</li>
                  <li>• Personal information like names, emails, or addresses</li>
                  <li>• File names or metadata from your images</li>
                  <li>• Compression settings or preferences</li>
                  <li>• Any data that could identify you personally</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>What We DO Collect</span>
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong>Basic Analytics:</strong> Anonymous usage statistics like page views, feature usage, and
                    general performance metrics to help us improve the service.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> Browser type, device type, and screen resolution to ensure
                    compatibility and optimize performance.
                  </li>
                  <li>
                    <strong>Error Reports:</strong> Anonymous error logs to help us fix bugs and improve stability.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Information</h2>
            <p className="text-sm mb-4">The limited information we collect is used solely to:</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Improve the performance and reliability of resizeimagefast</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Understand which features are most useful to users</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Fix bugs and technical issues</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ensure compatibility across different devices and browsers</span>
              </li>
            </ul>
          </section>

          {/* Image Processing */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Image Processing & Privacy</span>
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  🔒 Your Images Stay on Your Device
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  All image compression, resizing, and processing happens entirely within your web browser using
                  JavaScript. Your images are never uploaded to our servers, transmitted over the internet, or stored
                  anywhere outside your device.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">How It Works:</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>You select an image file from your device</li>
                  <li>The image is loaded into your browser's memory</li>
                  <li>All processing (compression, resizing, format conversion) happens locally</li>
                  <li>The processed image is made available for download</li>
                  <li>No data leaves your device at any point in this process</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Cookie className="w-6 h-6" />
              <span>Cookies and Tracking</span>
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  We use minimal essential cookies to remember your theme preference (dark/light mode) and ensure the
                  website functions properly. These cookies don't track you or collect personal information.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  We use privacy-focused analytics that don't use cookies or track individual users. This helps us
                  understand general usage patterns without compromising your privacy.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">No Third-Party Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  We don't use advertising networks, social media tracking pixels, or other third-party tracking
                  technologies that could compromise your privacy.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-sm mb-4">
              Since your images never leave your device, they're as secure as your own computer or mobile device.
              However, we still take security seriously:
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Our website is served over HTTPS to ensure secure communication</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We regularly update our security practices and dependencies</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Any data we do collect is stored securely and access is strictly limited</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We don't store any data that could be used to identify individual users</span>
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-sm mb-4">
              Since we collect minimal data and don't store personal information, most privacy rights are automatically
              protected. However, you have the right to:
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Know what data we collect (outlined in this policy)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Opt out of analytics by using browser settings or ad blockers</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contact us with any privacy concerns or questions</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use resizeimagefast without providing any personal information</span>
              </li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-sm mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
              reasons. When we do:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We'll update the "Last updated" date at the top of this page</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>For significant changes, we'll provide notice on our website</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Your continued use of resizeimagefast constitutes acceptance of the updated policy</span>
              </li>
            </ul>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Ready to compress your images privately?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Experience fast, secure image compression that respects your privacy.
            </p>
            <Button
              asChild
              size="lg"
              aria-label="Go to homepage and start compressing images"
              title="Start Compressing Images"
            >
              <Link href="/" className="w-full flex justify-center items-center">
                Start Compressing Images
              </Link>
            </Button>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <Banana className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">resizeimagefast</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground max-w-md">
                <span>Free, privacy-focused image compression that runs entirely in your browser. Reduce file sizes, resize images, and add watermarks without uploading anything.</span>
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-center text-sm text-muted-foreground">
            © 2025 resizeimagefast. Fast, free, and privacy-focused image compression.
          </p>
        </div>
      </footer>
    </div>
  )
}
