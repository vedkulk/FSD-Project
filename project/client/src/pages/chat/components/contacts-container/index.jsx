const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl::w-[20vw] bg-[#1b1c24] border-r-2 brder-[#2f303b] w-full">
      <div className="pt-3">
        <Logo/>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pt-10 pr-5">
          <Title text="Direct Messages"/>
        </div>
      </div>
    </div>
  )
}
export default ContactsContainer
const Logo = () => {
  return (
    <div className="absolute top-0 left-0 m-4">
      <h1 className="text-4xl font-bold">
        chat<span className="text-red-500">MIT</span>
      </h1>
    </div>
  );
};
const Title = ({text}) => {
  return(
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  )
}