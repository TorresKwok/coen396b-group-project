import SpecimenItem from "./specimenItem"

function SpecimenPage() {
	return (
		<SpecimenItem
			specimen={{
				description: "Western Wheatgrass",
				imageUrl:
					"https://web.corral.tacc.utexas.edu/torch/ACU/ACU0000000/ACU0000066_med.jpg",
				imdbUrl:
					"https://portal.torcherbaria.org/portal/collections/individual/index.php?occid=26990198",
				name: "Agropyron smithii",
				director: "ACU",
				stars: "ACU",
				types: [
					"Plantae",
					"Tracheophyta",
					"Spermatophyta",
					"Magnoliophyta",
				],
				imdbRating: 5,
				time: "1961-05-05",
				year: "1961",
			}}
		/>
	)
}

export default SpecimenPage
