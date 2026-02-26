import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, coverImage, excerpt, date, slug } = blog;
    return (
        <>
            <div className="group relative">
                <div className="mb-8 overflow-hidden rounded-lg">
                    <Link href={`/${slug}`} aria-label="blog cover" className="block">
                        <Image
                            src={coverImage!}
                            alt={title ?? 'image'}
                            className="w-full transition duration-0.4s group-hover:scale-125 object-cover"
                            width={408}
                            height={272}
                            style={{ width: '100%', height: '272px' }}
                            quality={100}
                        />
                    </Link>
                </div>
                <div>
                    <h3>
                        <Link
                            href={`/${slug}`}
                            className="mb-4 inline-block font-semibold text-dark text-secondary group-hover:text-primary dark:text-white dark:group-hover:text-primary text-[22px] leading-[2rem]"
                        >
                            {title}
                        </Link>
                    </h3>
                    <span className="text-sm font-semibold leading-loose text-gray">
                        {format(new Date(date), "dd MMM yyyy")}
                    </span>
                </div>
            </div>
        </>
    );
};

export default BlogCard;