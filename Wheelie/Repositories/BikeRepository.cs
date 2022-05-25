using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class BikeRepository : IBikeRepository
    {
        private readonly IConfiguration _config;

        public BikeRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Bike> GetAllBikes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Brand,
                                               Color,
                                               Accessories
                                        FROM Bike";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Bike> bikes = new List<Bike>();
                    while (reader.Read())
                    {
                        Bike bike = new Bike
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Color = reader.GetString(reader.GetOrdinal("Color")),
                            Accessories = reader.GetString(reader.GetOrdinal("Accessories"))
                        };

                        bikes.Add(bike);
                    }

                    reader.Close();

                    Console.WriteLine(bikes);
                    return bikes;
                }
            }
        }

        public Bike GetBikeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Brand,
                                               Color,
                                               Accessories
                                        FROM Bike
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Bike bike = new Bike
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Color = reader.GetString(reader.GetOrdinal("Color")),
                            Accessories = reader.GetString(reader.GetOrdinal("Accessories"))
                        };

                        reader.Close();
                        return bike;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddBike(Bike bike)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bike (Brand,
                                                          Color,
                                                          Accessories)
                                        OUTPUT INSERTED.ID
                                        VALUES (@brand, @color, @accessories);";

                    cmd.Parameters.AddWithValue("@brand", bike.Brand);
                    cmd.Parameters.AddWithValue("@color", bike.Color);
                    cmd.Parameters.AddWithValue("@accessories", bike.Accessories);

                    int id = (int)cmd.ExecuteScalar();

                    bike.Id = id;
                }
            }
        }

        public void UpdateBike(Bike bike)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Bike
                                        SET Brand = @brand,
                                            Color = @color,
                                            Accessories = @accessories
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", bike.Id);
                    cmd.Parameters.AddWithValue("@brand", bike.Brand);
                    cmd.Parameters.AddWithValue("@color", bike.Color);
                    cmd.Parameters.AddWithValue("@accessories", bike.Accessories);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBike(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Bike
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
