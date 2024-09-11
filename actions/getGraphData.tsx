import moment from "moment"
import prisma from "@/libs/prismadb"

export default async function getGraphData() {
  try {
    // get the start and end dates for the data range ( 7 days ago to today)

    const startDate = moment().subtract(6, "days").startOf("day")
    const endDate = moment().endOf("day")

    // query the database to get order data grouped by created date

    const result = await prisma?.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    })

    // initialize an object to aggregate the data by day

    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number }
    } = {}

    // create a clone of the start date to iterate over each day
    const currentDate = startDate.clone()

    // iterate over each day in the date range

    while (currentDate <= endDate) {
      //format the dat as a strinf (eg 'Monday')
      const day = currentDate.format("dddd")
      console.log("day<<<<<<<<<", day, currentDate)

      //initialize the aggregated data for the day with the day, date and totalAmount

      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      }

      currentDate.add(1, "day")
    }

    // calculate the total amount for each day by summing the order amounts

    result?.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd")
      const amount = entry._sum.amount || 0
      aggregatedData[day].totalAmount += amount
    })

    //convert the aggregateddata object to an array and sort it by date
    const formatedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    )

    // Return the formatted data
    return formatedData
  } catch (error: any) {
    throw new Error(error)
  }
}
