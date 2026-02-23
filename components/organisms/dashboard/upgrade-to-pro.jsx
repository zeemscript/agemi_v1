import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from '@/components/atoms/form/Button'
const UpgradeToPro = () => {
    return (
            <Card x-chunk="dashboard-02-chunk-0" className=" bg-[#071023] rounded-2xl">
                <CardHeader className="p-2 md:p-3">
                    <CardTitle>Upgrade to pro.</CardTitle>
                    <CardDescription>
You are missing out the best from the pro features, better feasiblity better report, btter you.                                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button round wide className="w-full text-sm bg-accent text-white">
                      Upgrade
                    </Button>
                </CardContent>
            </Card>
    )
}

export default UpgradeToPro;
