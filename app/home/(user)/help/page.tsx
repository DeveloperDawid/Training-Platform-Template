import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail, MessageSquare, HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with support
        </p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              How do I start a training module?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Go to your dashboard and click on any of the training module cards
              (Quiz, Support Chat, or AI Cases). Each module will guide you
              through the training process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              How is my progress tracked?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your progress is automatically tracked. Visit the Statistics page
              to see your achievements, XP progress, and performance across all
              training modules.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Can I repeat training modules?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Yes! You can repeat any training module as many times as you want.
              Each attempt will help improve your skills.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Support Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Having Issues?</h2>

        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-900 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5" />
              Technical Problems?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you encounter any technical issues, bugs, or problems with the
              platform, please contact the website administrator:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    Send a detailed description of your issue to the
                    administrator
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <p className="font-semibold">Direct Contact</p>
                  <p className="text-sm text-muted-foreground">
                    Reach out to the website administrator directly for urgent
                    issues
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm pt-4 border-t font-semibold">
              When reporting issues, please include:
            </p>
            <div className="space-y-2 mt-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
                  1
                </div>
                <p className="text-sm">
                  What you were doing when the issue occurred
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <p className="text-sm">Any error messages you received</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
                  3
                </div>
                <p className="text-sm">Your username/email</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
                  4
                </div>
                <p className="text-sm">The time the issue happened</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
