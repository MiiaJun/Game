import { useState } from 'react'
import axios from 'axios'
import './App.css'

const enemyTypes = [{ id: 0, label: 'Basic Enemy' }]

export default function App() {
	const [formData, setFormData] = useState({
		name: '',
		type: '0',
	})

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post('https://game.rabutenri.com/api/createSpawnRequest.php', {
				name: formData.name,
				type: formData.type
			});
		} catch (error) {
			alert('Failed to submit spawn request')
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

				<button>Spawn Enemy</button>
			</form>
		</main>
	)
}