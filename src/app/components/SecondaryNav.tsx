// 'use client'
// import { Fragment, useState } from 'react'
// import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
// import {
//   QuestionMarkCircleIcon,
//   ShoppingBagIcon,
// } from '@heroicons/react/24/outline'

// const navigation = {
//   categories: [
//     {
//       name: 'Bounce Houses',
//       featured: [
//         {
//           name: 'New Arrivals',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//           imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
//         },
//         {
//           name: 'Combos',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
//           imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
//         },
//         {
//           name: 'Accessories',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
//           imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
//         },
//         {
//           name: 'Carry',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
//           imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
//         },
//       ],
//     },
//     {
//       name: 'Combos',
//       featured: [
//         {
//           name: 'New Arrivals',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
//           imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
//         },
//         {
//           name: 'Basic Tees',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
//           imageAlt: 'Model wearing light heather gray t-shirt.',
//         },
//         {
//           name: 'Accessories',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
//           imageAlt:
//             'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
//         },
//         {
//           name: 'Carry',
//           href: '#',
//           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
//           imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
//         },
//       ],
//     },
//   ]
// }

// function classNames(...classes: any[]) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function SecondaryNav() {
//   const [open, setOpen] = useState(false)

//   return (
//     <div className="">
//       <header className="relative">
//         <nav aria-label="Top">
//           {/* Secondary navigation */}
//           <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="border-b border-gray-200">
//                 <div className="flex justify-around h-16">

//                   <div className="h-full flex">
//                     {/* Flyout menus */}
//                     <Popover.Group className="inset-x-0 bottom-0 px-4">
//                       <div className="flex h-full space-x-8">
//                         {navigation.categories.map((category) => (
//                           <Popover key={category.name} className="flex">
//                             {({ open }) => (
//                               <>
//                                 <div className="relative flex">
//                                   <Popover.Button
//                                     className={classNames(
//                                       open
//                                         ? 'border-indigo-600 text-indigo-600'
//                                         : 'border-transparent text-gray-700 hover:text-gray-800',
//                                       'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
//                                     )}
//                                   >
//                                     {category.name}
//                                   </Popover.Button>
//                                 </div>

//                                 <Transition
//                                   as={Fragment}
//                                   enter="transition ease-out duration-200"
//                                   enterFrom="opacity-0"
//                                   enterTo="opacity-100"
//                                   leave="transition ease-in duration-150"
//                                   leaveFrom="opacity-100"
//                                   leaveTo="opacity-0"
//                                 >
//                                   <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
//                                     {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
//                                     <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

//                                     <div className="relative bg-white">
//                                       <div className="mx-auto max-w-7xl px-8">
//                                         <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
//                                           {category.featured.map((item) => (
//                                             <div key={item.name} className="group relative">
//                                               <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
//                                                 <img
//                                                   src={item.images[0]}
//                                                   alt={item.description}
//                                                   className="object-cover object-center"
//                                                 />
//                                               </div>
//                                               <a href={"/item/1"} className="mt-4 block font-medium text-gray-900">
//                                                 <span className="absolute inset-0 z-10" aria-hidden="true" />
//                                                 {item.name}
//                                               </a>
//                                               <p aria-hidden="true" className="mt-1">
//                                                 Rent now
//                                               </p>
//                                             </div>
//                                           ))}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </Popover.Panel>
//                                 </Transition>
//                               </>
//                             )}
//                           </Popover>
//                         ))}

//                       </div>
//                     </Popover.Group>
//                   </div>

//                   {/* Mobile menu and search (lg-)
//                   <div className="flex flex-1 items-center lg:hidden">
//                     <button
//                       type="button"
//                       className="-ml-2 rounded-md bg-white p-2 text-gray-400"
//                       onClick={() => setOpen(true)}
//                     >
//                       <span className="sr-only">Open menu</span>
//                       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//                     </button>
//                   </div> */}
//                   <div className="flex items-center justify-end w-3/6">
//                     <div className="flex items-center lg:ml-8">
//                       {/* Help */}
//                       <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
//                         <span className="sr-only">Help</span>
//                         <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
//                       </a>
//                       <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
//                         Help
//                       </a>

//                       {/* Cart */}
//                       <div className="ml-4 flow-root lg:ml-8">
//                         <a href="/cart" className="group -m-2 flex items-center p-2">
//                           <ShoppingBagIcon
//                             className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                             aria-hidden="true"
//                           />
//                           <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
//                           <span className="sr-only">items in cart, view bag</span>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }
