import { useState } from 'react'
import axios from 'axios'
import './App.css'

const enemyTypes = [
	{id: 0, label: 'Basic Enemy'},
	{id: 1, label: 'Speed Enemy'},
	{id: 2, label: 'Range Enemy'}
]

export default function App() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [cooldown, setCooldown] = useState(0)

	const [formData, setFormData] = useState({
		name: '',
		type: '0',
	})

	useEffect(() => {
		if (cooldown === 0) return

		const timer = setTimeout(() => {
			setCooldown((prev) => prev - 1)
		}, 1000)

		return () => clearTimeout(timer)
	}, [cooldown])

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSubmitting || cooldown > 0) return
		setIsSubmitting(true)

		try {
			await axios.post('https://game.rabutenri.com/api/createSpawnRequest.php', {
				name: formData.name,
				type: formData.type
			});
		} catch (error) {
			alert('Failed to submit spawn request')
		} finally {
			setIsSubmitting(false)
			setCooldown(10)
		}
	}

	return (
		<main className="page">
			<form className="spawn-form" onSubmit={handleSubmit}>
				<h1 id="form-title">Spawn an Enemy</h1>
				<p>Give your enemy a name and choose its type</p>
				<label htmlFor="name">Display name</label>
				<input
					id="name"
					placeholder="Enter a name (optional)"
					maxLength={30}
					value={formData.name}
					onChange={handleChange}
				/>

				<label htmlFor="type">Enemy type</label>
				<select
					id="type"
					value={formData.type}
					onChange={handleChange}
				>
					{enemyTypes.map((enemy) => (
						<option key={enemy.id} value={enemy.id}>
							{enemy.label}
						</option>
					))}
				</select>

				<button disabled={isSubmitting || cooldown > 0}>
					{cooldown > 0 ? cooldown : "Spawn Enemy"}
				</button>
			</form>
		</main>
	)
}