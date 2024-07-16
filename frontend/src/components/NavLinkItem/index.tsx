import Link, { LinkProps } from 'next/link'

const NavLinkItem: React.FC<LinkProps & { title: string }> = (props) => {
  return (
    <Link 
      className='font-semibold w-fit max-h-[24px] max-w-fit px-20 mx-10'
      {...props} 
      title={props.title || ''}
    />
  )
}

export default NavLinkItem