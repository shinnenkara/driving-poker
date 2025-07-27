'use client'

import {createClient} from '@/lib/supabase/client'
import {Button} from '@/components/ui/button'
import {useState} from 'react'
import Image from 'next/image'

export function GoogleForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSocialLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/oauth?next=/profile`,
                },
            })

            if (error) throw error
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSocialLogin}>
            <div className="flex flex-col gap-6">
                {error && <p className="text-sm text-destructive-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : (<div className={"flex gap-2"}>
                        <Image
                            src="/google.svg"
                            alt="Google"
                            width={16}
                            height={16}
                            className="mr-2 invert"
                        />
                        <span>Continue with Google</span>
                    </div>)}
                </Button>
            </div>
        </form>
    )
}