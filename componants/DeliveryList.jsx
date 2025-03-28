import RemoveBtn from "./RemoveBtn";

const getDelivery = async () => {
    try {
        const res = await fetch("https://vehicle-tracking-five.vercel.app/api/GetVehicles", {
            method: "GET",
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        return res.json();

    } catch (error) {
        console.log(error);
    }
}

export default async function DeliveryList() {

    const data = await getDelivery();
    const deliveries = data?.deliveries || [];
    var del = 0;

    function time() {
        var hour = Number(deliveries[del].createdAt.slice(11, 13)) + Math.floor(deliveries[del].total_time / 60)+5;
        var minutes = Number(deliveries[del].createdAt.slice(14, 16)) + Math.floor(deliveries[del].total_time % 60)+30;
        del++;

        
        if (minutes>=120){
            minutes= minutes-120;
            hour+=2;
        }
        if (minutes >= 60) {
            minutes = minutes - 60;
            hour++;
        }
        if (hour > 12 && hour < 24) {
            hour = hour - 12;
            return hour + ":" + minutes + " pm";
        }
        if (hour >= 24) {
            hour -= 24;
            return hour + ":" + minutes + " am";
        }
        if (minutes < 10) {
            if (hour > 12 && hour < 24) {
                hour = hour - 12;
                return hour + ":0" + minutes + " pm";
            }
            if (hour >= 24) {
                hour -= 24;
                return hour + ":0" + minutes + " am";
            }
        }
        return hour + ":" + minutes + " am";
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Driver Name</th>
                    <th>End Location</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {deliveries.map((delivery) => (
                    <tr key={delivery._id}>
                        <td>{Number(del) + 1}</td>
                        <td>{delivery.driver}</td>
                        <td>{delivery.end_position}</td>
                        <td>{time()}</td>
                        <RemoveBtn id={delivery._id} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
