"use client"
import { useRouter } from 'next/navigation';
import React, { Fragment,useRef } from 'react'
import { Toaster,toast } from 'react-hot-toast'

const AddBlog = () => {

   const titleRef = useRef<HTMLInputElement | null>();
   const descriptionRef=useRef<HTMLInputElement | null>();
   const router=useRouter();
   const postBlog=async({title,description}:{title:String;description:String;})=>{
    const res=fetch("http://localhost:3000/api/blog",{
      method:"POST",
      body:JSON.stringify({title,description}),
      //@ts-ignore
      "Content-Type":"application/json",

    });
    return (await res).json();
   }
   const handleSubmit=async (e:any)=>{
    e.preventDefault();

    if(titleRef.current && descriptionRef.current){
        toast.loading("sending request",{id:"1"})
      await postBlog({title:titleRef.current?.value,description:descriptionRef.current?.value});
      toast.success("Blog posted Successfully",{id:"1"})
    router.push("http://localhost:3000")


    }
   };

  return <Fragment>
    <Toaster />
    <div className="full m-auto flex my-4">
            <div className="flex flex-col justify-center m-auto">
                <p className="text-3xl text-slate-200 font-bold p-3">Add Wonder Blog

                </p>
                <form onSubmit={handleSubmit}>
                  <input ref={titleRef} type="text" className='rounded-md px-4 py-2 my-2 w-full' placeholder='Enter title'/>
                  <textarea  ref={descriptionRef} className="my-2 rounded-md px-4 py-2 w-full my-2" placeholder='description'></textarea>
                  <button className="bg-slate-200 px-4 py-2 rounded-md m-auto hover:bg-slate-100 shadow-xl">Submit</button>
                </form>
            </div>
    </div>
  </Fragment>
}

export default AddBlog