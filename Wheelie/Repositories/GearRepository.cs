using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class GearRepository : IGearRepository
    {
        private readonly IConfiguration _config;

        public GearRepository(IConfiguration config)
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

        public Gear GetGearById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               BikeId,
                                               HelmetId,
                                               ClothingId,
                                               BikerId
                                        FROM Gear
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Gear gear = new Gear
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BikeId = reader.GetInt32(reader.GetOrdinal("BikeId")),
                            HelmetId = reader.GetInt32(reader.GetOrdinal("HelmetId")),
                            ClothingId = reader.GetInt32(reader.GetOrdinal("ClothingId")),
                            BikerId = reader.GetInt32(reader.GetOrdinal("BikerId"))
                        };

                        reader.Close();
                        return gear;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddGear(Gear gear)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Gear (BikeId,
                                                          HelmetId,
                                                          ClothingId,
                                                          BikerId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@bikeId, @helmetId, @clothingId, @bikerId);";

                    cmd.Parameters.AddWithValue("@bikeId", gear.BikeId);
                    cmd.Parameters.AddWithValue("@helmetId", gear.HelmetId);
                    cmd.Parameters.AddWithValue("@clothingId", gear.ClothingId);
                    cmd.Parameters.AddWithValue("@bikerId", gear.BikerId);

                    int id = (int)cmd.ExecuteScalar();

                    gear.Id = id;
                }
            }
        }

        public void DeleteGear(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Gear
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
