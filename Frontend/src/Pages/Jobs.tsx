import Header from '../Components/Header'

const Jobs = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Jobs</h1>
        <p className="mt-2 text-slate-600">Explore career and freelance project opportunities.</p>
      </main>
    </div>
  )
}

export default Jobs