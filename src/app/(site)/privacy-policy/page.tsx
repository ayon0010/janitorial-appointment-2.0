import React from 'react'
import HeroSub from '@/components/SharedComponent/HeroSub'
import type { Metadata } from 'next'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Privacy Policy | Janitorial Appointments',
    description:
        'Learn how Janitorial Appointments collects, uses and protects your information. We only use your data to deliver commercial cleaning leads and appointments you request.',
    alternates: { canonical: buildCanonical('/privacy-policy') },
    robots: {
        index: true,
        follow: true,
    },
}

const PrivacyPolicyPage = () => {
    return (
        <>
            <HeroSub
                title="Privacy Policy"
                description="We respect your privacy and use your information only to deliver the commercial cleaning leads and appointments that you request."
            />

            <section className="bg-white dark:bg-darkmode py-16 md:py-24">
                <div className="container max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight px-6 py-8 md:px-10 md:py-10 shadow-sm">
                        <p className="text-sm text-SlateBlue dark:text-darktext mb-6">
                            Last updated: {new Date().getFullYear()}
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4">
                            1. Overview
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            This Privacy Policy explains how Janitorial Appointments (&quot;we&quot;, &quot;our&quot;,
                            &quot;us&quot;) collects, uses and protects your information when you use our website or
                            services. Our business is simple: we generate commercial cleaning leads and
                            appointments for janitorial companies, and we use your information only to support
                            this service.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            2. Information We Collect
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We collect only the information that is necessary to contact you and to deliver
                            appointments or leads you request. This may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
                            <li>Company name and contact person&apos;s name.</li>
                            <li>Email address and phone number.</li>
                            <li>Service areas, states and zip codes you serve.</li>
                            <li>
                                Optional Do Not Call (DNC) lists or exclusions you provide so we don&apos;t contact
                                specific numbers or addresses.
                            </li>
                            <li>
                                Basic usage information when you interact with our website (pages visited, form
                                submissions, etc.), often in aggregated or anonymized form.
                            </li>
                        </ul>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We do <span className="font-semibold">not</span> intentionally collect sensitive
                            personal information (such as financial data, government IDs or health data) through
                            this website.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We use your information strictly to provide and improve our lead generation and
                            appointment setting services. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
                            <li>Contacting you about your requests or account.</li>
                            <li>
                                Matching your company with suitable commercial cleaning opportunities and
                                appointments.
                            </li>
                            <li>
                                Scheduling and confirming walkthroughs or calls with potential clients on your
                                behalf.
                            </li>
                            <li>
                                Respecting your DNC list or exclusions so we do not contact people you specify.
                            </li>
                            <li>
                                Sending service-related updates, such as changes to our terms or important
                                information about your leads.
                            </li>
                        </ul>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We do <span className="font-semibold">not</span> use your information to build
                            unrelated marketing profiles, and we do not sell your information to third parties.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            4. Sharing Your Information
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We only share your information in limited situations necessary to deliver the
                            services you request or to comply with the law, for example:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
                            <li>
                                With service providers that help us operate our platform, such as email providers,
                                hosting and analytics tools. These providers are only allowed to use your
                                information to perform services for us.
                            </li>
                            <li>
                                With potential clients during the appointment setting process, when it is necessary
                                to share your company name and contact details to confirm meetings.
                            </li>
                            <li>
                                When required by law, regulation or legal process, or to protect our rights or the
                                rights of others.
                            </li>
                        </ul>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We do <span className="font-semibold">not</span> sell, rent or trade your information
                            to data brokers or third parties for their independent marketing purposes.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            5. Data Retention
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We keep your information only for as long as it is needed to provide our services,
                            meet legal obligations, or resolve disputes. This typically means we retain lead and
                            appointment data while you are actively working with us and for a reasonable period
                            afterward for record-keeping and accounting.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            6. Cookies and Analytics
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            Our website may use cookies and similar technologies to understand basic usage (for
                            example, which pages are visited) and to help improve the experience. We may also use
                            tools like Google Tag Manager or analytics services to measure performance and
                            conversions.
                        </p>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            You can control cookies through your browser settings. If you disable cookies, some
                            parts of the website may not function perfectly, but core features like contacting us
                            should still work.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            7. Your Choices and Rights
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            Depending on where you are located, you may have the right to access, update or
                            request deletion of your personal information. In any case, you can always:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
                            <li>Contact us to update your contact details or service areas.</li>
                            <li>Ask us to stop contacting you for new offers or updates.</li>
                            <li>
                                Provide or update your DNC list so we exclude numbers or addresses you specify.
                            </li>
                        </ul>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            To exercise any of these options, please reach out using the contact details on our
                            Contact page.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            8. Security
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We use reasonable technical and organizational measures to protect your information
                            from unauthorized access, loss or misuse. However, no system can be guaranteed to be
                            100% secure, and you should take care when sharing sensitive information online.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            9. Changes to This Policy
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
                            We may update this Privacy Policy from time to time to reflect changes in our
                            services or applicable laws. When we do, we will update the &quot;Last updated&quot;
                            date at the top of this page. Your continued use of our website or services after any
                            update means you accept the revised policy.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
                            10. Contact Us
                        </h2>
                        <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext">
                            If you have any questions about this Privacy Policy or how we handle your data,
                            please contact us using the form on our Contact page or by email at the address
                            provided there.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicyPage