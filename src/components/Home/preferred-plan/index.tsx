'use client'
import { useReducer, useState } from 'react'
import { usePathname } from 'next/navigation'

const CONTACT_EMAIL = 'contact@janitorialappointment.com'

// Monthly contract: $130/lead. Yearly contract: $120/lead.
const MONTHLY_PER_LEAD = 130
const YEARLY_PER_LEAD = 120
const BASIC_LEADS_PER_MONTH = 7
const PROFESSIONAL_LEADS_PER_MONTH = 12

function buildPlanEmailUrl(plan: {
  name: string
  price: number
  leads: number
  perLead: number
  duration: string
}) {
  const subject = encodeURIComponent(`I want to start: ${plan.name} plan ($${plan.price}/${plan.duration})`)
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in the ${plan.name} plan:\n\n` +
    `• Plan: ${plan.name}\n` +
    `• Price: $${plan.price}/${plan.duration}\n` +
    `• Appointments: ${plan.leads}/month\n` +
    `• Per lead: $${plan.perLead}\n\n` +
    `Please let me know the next steps.\n\nThank you.`
  )
  // Gmail compose URL so on PC it opens Gmail in the browser
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}&body=${body}`
}

const Preferred = () => {
  const [activeTab, setActiveTab] = useState('monthly')

  const initialTabConfig = {
    planType: 'monthly',
    basicPrice: BASIC_LEADS_PER_MONTH * MONTHLY_PER_LEAD,
    professionalPrice: PROFESSIONAL_LEADS_PER_MONTH * MONTHLY_PER_LEAD,
    basicLeads: BASIC_LEADS_PER_MONTH,
    professionalLeads: PROFESSIONAL_LEADS_PER_MONTH,
    perLeadCost: MONTHLY_PER_LEAD,
    duration: 'month',
  }
  interface State {
    planType: string
    basicPrice: number
    professionalPrice: number
    basicLeads: number
    professionalLeads: number
    perLeadCost: number
    duration: string
  }
  interface Action {
    type: string
    payload: {
      duration: string
      basicPrice: number
      professionalPrice: number
      basicLeads: number
      professionalLeads: number
      perLeadCost: number
    }
  }

  function reducer(tabConfig: State, action: Action) {
    switch (action.type) {
      case 'monthly':
        return {
          ...tabConfig,
          planType: action.type,
          basicPrice: action.payload.basicPrice,
          professionalPrice: action.payload.professionalPrice,
          basicLeads: action.payload.basicLeads,
          professionalLeads: action.payload.professionalLeads,
          perLeadCost: action.payload.perLeadCost,
          duration: action.payload.duration,
        }
        break
      case 'annually':
        return {
          ...tabConfig,
          planType: action.type,
          basicPrice: action.payload.basicPrice,
          professionalPrice: action.payload.professionalPrice,
          basicLeads: action.payload.basicLeads,
          professionalLeads: action.payload.professionalLeads,
          perLeadCost: action.payload.perLeadCost,
          duration: 'monthly',
        }
        break
      default:
        return tabConfig
    }
  }

  const [tabConfig, dispatch] = useReducer(reducer, initialTabConfig)

  const pathname = usePathname()
  console.log(pathname)

  return (
    <>
      <section
        className={`" dark:bg-darkmode " ${pathname === '/' ? 'py-20' : '-mt-52 pt-72'
          }`}>
        <div className='container'>
          <div data-aos='fade-up' data-aos-delay='200' data-aos-duration='1000'>
            <h2 className='text-secondary dark:text-white text-center'>
              Choose your preferred plan
            </h2>
            <p className='text-base font-normal text-SlateBlue dark:text-darktext max-w-585 text-center m-auto py-6'>
              Select the plan that fits your business needs and start receiving pre-qualified appointments today.
            </p>
          </div>
          <div>
            <div className='text-center pb-16'>
              <ul className='inline-flex items-center bg-AliceBlue dark:bg-darklight rounded-xl'>
                <li className='m-2'>
                  <button
                    className={`text-base font-normal text-secondary dark:text-white py-3 px-7 rounded-xl ${tabConfig.planType === 'monthly'
                      ? 'bg-white dark:bg-primary dark:text-white'
                      : ''
                      }`}
                    onClick={() =>
                      dispatch({
                        type: 'monthly',
                        payload: {
                          duration: 'month',
                          basicPrice: BASIC_LEADS_PER_MONTH * MONTHLY_PER_LEAD,
                          professionalPrice: PROFESSIONAL_LEADS_PER_MONTH * MONTHLY_PER_LEAD,
                          basicLeads: BASIC_LEADS_PER_MONTH,
                          professionalLeads: PROFESSIONAL_LEADS_PER_MONTH,
                          perLeadCost: MONTHLY_PER_LEAD,
                        },
                      })
                    }>
                    Monthly
                  </button>
                </li>
                <li className='m-2'>
                  <button
                    className={`text-base font-normal text-secondary dark:text-white py-3 px-7 rounded-xl ${tabConfig.planType === 'annually'
                      ? 'bg-white dark:bg-primary dark:text-white'
                      : ''
                      }`}
                    onClick={() =>
                      dispatch({
                        type: 'annually',
                        payload: {
                          duration: 'year',
                          basicPrice: BASIC_LEADS_PER_MONTH * YEARLY_PER_LEAD,
                          professionalPrice: PROFESSIONAL_LEADS_PER_MONTH * YEARLY_PER_LEAD,
                          basicLeads: BASIC_LEADS_PER_MONTH,
                          professionalLeads: PROFESSIONAL_LEADS_PER_MONTH,
                          perLeadCost: YEARLY_PER_LEAD,
                        },
                      })
                    }>
                    Annually
                  </button>
                </li>
              </ul>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7'>
              <div
                data-aos='fade-up'
                data-aos-delay='200'
                data-aos-duration='1000'
                className='col-span-1 shadow-plan_shadwo rounded-2xl'>
                <div className='relative h-full'>
                  <div className='h-full bg-primary rounded-2xl overflow-hidden'>
                    <img
                      src='/images/price-plan/plan-image.png'
                      alt=''
                      className='h-full object-cover'
                    />
                  </div>
                  <div className='pt-9 px-8 absolute z-3 top-0'>
                    <p className='text-white sm:text-3xl text-[22px] leading-[2rem] font-normal'>
                      Choosing yearly plan gives you{' '}
                      <span className='font-bold'>10% off all leads!</span>
                    </p>
                    <p className='text-xl font-normal text-white pt-5'>
                      Almost 30+ cleaning companies are using our service!
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-aos='fade-up'
                data-aos-delay='400'
                data-aos-duration='1000'
                className='col-span-1 shadow-plan_shadwo rounded-2xl dark:bg-darklight'>
                <div className='flex grow flex-col p-6 sm:p-8'>
                  <span className='text-[22px] leading-[2rem] font-bold text-SlateBlue dark:text-darktext pb-3'>
                    Basic
                  </span>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-5xl font-bold text-secondary dark:text-white'>
                      ${tabConfig.basicPrice}
                    </span>
                    <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                      /{tabConfig.duration}
                    </span>
                  </div>
                  <div className='mt-2 mb-2'>
                    <span className='text-lg font-semibold text-primary dark:text-primary-light'>
                      ${tabConfig.perLeadCost}/lead
                    </span>
                  </div>
                  <p className='text-SlateBlue dark:text-darktext opacity-75 text-base pt-6 border-b border-solid border-BorderLine dark:border-dark_border pb-5'>
                    Perfect for getting started with guaranteed appointments
                  </p>
                  <ul className='flex flex-col grow gap-5 pt-6'>
                    <li className='flex items-center gap-5'>
                      <span className='inline-flex shrink-0 size-[25px] min-w-[25px] min-h-[25px]' aria-hidden>
                        <svg
                          width='25'
                          height='25'
                          viewBox='0 0 25 25'
                          fill='#F3FAFF'
                          className='dark:fill-black w-full h-full block'
                          xmlns='http://www.w3.org/2000/svg'>
                          <circle cx='12.5' cy='12.5' r='12.5' />
                          <g clipPath='url(#clip0_7_836)'>
                            <path
                              d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                              fill='#2F73F2'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_7_836'>
                              <rect
                                width='11'
                                height='11'
                                fill='white'
                                transform='translate(7 7)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        <span className='font-bold'>{tabConfig.basicLeads} Appointments / month</span>
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <span className='inline-flex shrink-0 size-[25px] min-w-[25px] min-h-[25px]' aria-hidden>
                        <svg
                          width='25'
                          height='25'
                          viewBox='0 0 25 25'
                          fill='#F3FAFF'
                          xmlns='http://www.w3.org/2000/svg'
                          className='dark:fill-black w-full h-full block'>
                          <circle cx='12.5' cy='12.5' r='12.5' />
                          <g clipPath='url(#clip0_7_836)'>
                            <path
                              d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                              fill='#2F73F2'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_7_836'>
                              <rect
                                width='11'
                                height='11'
                                fill='white'
                                transform='translate(7 7)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        100% Exclusive Appointments
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Phone & Address Verified
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Appointment Fixed With Decision Maker
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Choose your own demography
                      </span>
                    </li>
                  </ul>
                  <a
                    href={buildPlanEmailUrl({
                      name: 'Basic',
                      price: tabConfig.basicPrice,
                      leads: tabConfig.basicLeads,
                      perLead: tabConfig.perLeadCost,
                      duration: tabConfig.duration,
                    })}
                    className='btn mt-12 py-3 rounded-lg text-center block'>
                    Start Now
                  </a>
                </div>
              </div>
              <div
                data-aos='fade-up'
                data-aos-delay='600'
                data-aos-duration='1000'
                className='col-span-1 shadow-plan_shadwo rounded-2xl dark:bg-darklight'>
                <div className='flex grow flex-col p-6 sm:p-8'>
                  <span className='text-[22px] leading-[2rem] font-bold text-SlateBlue dark:text-darktext pb-3'>
                    Premium
                  </span>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-5xl font-bold text-secondary dark:text-white'>
                      ${tabConfig.professionalPrice}
                    </span>
                    <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                      /{tabConfig.duration}
                    </span>
                  </div>
                  <div className='mt-2 mb-2'>
                    <span className='text-lg font-semibold text-primary dark:text-primary-light'>
                      ${tabConfig.perLeadCost}/lead
                    </span>
                  </div>
                  <p className='text-SlateBlue dark:text-darktext opacity-75 text-base pt-6 border-b border-solid border-BorderLine dark:border-dark_border pb-5'>
                    For growth-focused businesses who want maximum volume
                  </p>
                  <ul className='flex flex-col grow gap-5 pt-6'>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        <span className='font-bold'>{tabConfig.professionalLeads} Appointments / month</span>
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        100% Exclusive Appointments
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Phone & Address Verified
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Appointment Fixed With Decision Maker
                      </span>
                    </li>
                    <li className='flex items-center gap-5'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#F3FAFF'
                        className='dark:fill-black w-full h-full block'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='12.5' cy='12.5' r='12.5' />
                        <g clipPath='url(#clip0_7_836)'>
                          <path
                            d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                            fill='#2F73F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_7_836'>
                            <rect
                              width='11'
                              height='11'
                              fill='white'
                              transform='translate(7 7)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='text-base text-SlateBlue dark:text-darktext font-normal min-w-0'>
                        Choose your own demography
                      </span>
                    </li>
                  </ul>
                  <a
                    href={buildPlanEmailUrl({
                      name: 'Premium',
                      price: tabConfig.professionalPrice,
                      leads: tabConfig.professionalLeads,
                      perLead: tabConfig.perLeadCost,
                      duration: tabConfig.duration,
                    })}
                    className='btn mt-12 py-3 rounded-lg text-center block'>
                    Start Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Preferred