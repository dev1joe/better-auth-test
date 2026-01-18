import { SignInTab } from "@/components/SignInTab";
import { SignUpTab } from "@/components/SignUpTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LoginPage() {
    return (
        <div className="py-8 lg:flex lg:flex-col lg:items-center">
            <Tabs defaultValue="signin" className="max-auto my-6 px-4 border-2 border-lime-500 lg:w-4/12">
                <TabsList className="**:cursor-pointer">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SignInTab></SignInTab>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Sign Up</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SignUpTab></SignUpTab>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}