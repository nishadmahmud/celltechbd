import Image from 'next/image';
import Link from 'next/link';

export default function PromoBanners() {
    const banners = [
        {
            id: 1,
            imageUrl: "https://scontent.fdac178-1.fna.fbcdn.net/v/t39.30808-6/641378335_915155457728332_1864082608603137099_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=iX8CM6aFLVMQ7kNvwGW--kg&_nc_oc=AdlAuMV3NaNXiB0HJM5SQCBl85n-wg4NacISN2uAXOD_1N-Thqd8ADqZ_XMs4cw67lQ&_nc_zt=23&_nc_ht=scontent.fdac178-1.fna&_nc_gid=b-IsfcX4vw70T8-QlMvt8A&_nc_ss=8&oh=00_AfztFVfdmqZEqEyVjx4mpWT13KKSR2Q8ceGXf5sM_ZEJOw&oe=69AED249",
            link: "/special-offers"
        },
        {
            id: 2,
            imageUrl: "https://scontent.fdac178-1.fna.fbcdn.net/v/t39.30808-6/617658781_914142274496317_6709089484964480054_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=pxJJ_HffutUQ7kNvwGOw730&_nc_oc=AdkCyS5VjN0SiifV-SPct0RokqoWTs3lKjkkqc4Ns20WqQ5C1j-2YbZUgfLxleNQeYU&_nc_zt=23&_nc_ht=scontent.fdac178-1.fna&_nc_gid=ijC35M8jbMBTdSFsIcJYow&_nc_ss=8&oh=00_AfwnWkGHOHU4_AX-zGuQdMjyuGJHCtRKA1xIC8zMNyI43w&oe=69AEE5B5",
            link: "/special-offers"
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {banners.map((banner) => (
                        <Link href={banner.link} key={banner.id} className="block group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[550px]">
                                <Image
                                    src={banner.imageUrl}
                                    alt="Promotional Banner"
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
