"use client"
import { useRouter } from 'next/navigation'
import React, { Fragment,useEffect,useRef } from 'react'
import { Toaster,toast } from 'react-hot-toast'
type UpdateBlogParams={
    title:String,
    description:String,
    id:String
}
const getBlogById=async(id:string)=>{
    const res=await fetch(`http://localhost:3000/api/blog/${id}`)
    const data=await res.json();
    return data.post;
}
const EditPage = ({params}:{params:{id:string}}) => {
    console.log(params.id)
   const titleRef = useRef<HTMLInputElement | null>();
   const descriptionRef=useRef<HTMLInputElement | null>();
   const router=useRouter();


   const updateBlog=async(data:UpdateBlogParams)=>{
    const res=fetch(`http://localhost:3000/api/blog/${data.id}`,{
      method:"PUT",
      body:JSON.stringify({title:data.title,description:data.description}),
      //@ts-ignore
      "Content-Type":"application/json",

    });
    return (await res).json();
   }


   const deleteBlog=async(id:string)=>{
    const res=fetch(`http://localhost:3000/api/blog/${id}`,{
      method:"DELETE",
      //@ts-ignore
      "Content-Type":"application/json",

    });
    return (await res).json();
   }



   const handleDelete=async()=>{
    toast.loading("Deleting Blog",{id:"2"});
    await deleteBlog(params.id);
    toast.success("Blog Deleted",{id:"2"})
    router.push("http://localhost:3000")

}


   useEffect(()=>{

    toast.loading("fetching blog Details ",{id: "1"});

    getBlogById(params.id)
    .then((data)=>{
        if(titleRef.current && descriptionRef.current){
            titleRef.current.value=data.title;
            descriptionRef.current.value=data.description;
            toast.success("Fetching Complete",{id:"1"});
    
        }
    })
    .catch(()=>{
        toast.error("error in fetch",{id : "1"})
    })
   },[])
   const handleSubmit=async (e:any)=>{
    e.preventDefault();

    if(titleRef.current && descriptionRef.current){
        toast.loading("sending request",{id:"1"})
       await updateBlog({title:titleRef.current?.value,description:descriptionRef.current?.value,
        id:params.id,
    });
       toast.success("Blog posted Successfully",{id:"1"})
       router.push("http://localhost:3000")


    }
   };

  return <Fragment>
    <Toaster />
    <div className="full m-auto flex my-4">
            <div className="flex flex-col justify-center m-auto">
                <p className="text-3xl text-slate-200 font-bold p-3">Edit Wonder Blog

                </p>
                <form onSubmit={handleSubmit}>
                  <input ref={titleRef} type="text" className='rounded-md px-4 py-2 my-2 w-full' placeholder='Enter title'/>
                  <textarea  ref={descriptionRef} className="my-2 rounded-md px-4 py-2 w-full my-2" placeholder='description'></textarea>
                  <div className="flex justify-between">

                  <button className="bg-slate-200 px-4 py-2 rounded-md m-auto hover:bg-slate-100 shadow-xl">Update</button>
                  
                  </div>
                </form>

                <button onClick={handleDelete} className="bg-slate-200 px-4 py-2 rounded-md m-auto hover:bg-slate-100 shadow-xl">Delete</button>
                  
            </div>
    </div>
  </Fragment>
}

export default EditPage