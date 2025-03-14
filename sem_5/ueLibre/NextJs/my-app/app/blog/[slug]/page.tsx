export default async function BlogPage({ params } : {params: {slug: string}}){
    const {slug} = await params;
    return(
        <div>
            <h1>L'article : {params.slug}</h1>
            <p>Ceci est l'article avec le Slug: {params.slug}</p>
        </div>
    );
}